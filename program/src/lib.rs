use anchor_lang::prelude::*;
use arcis::*;
use arcium_anchor::prelude::*;

declare_id!("8FbVRnSmv1FtZvgYA4HjN7HN9BCQVZYuR3jf2sFsscgV");

#[program]
pub mod gov_encrypt {
    use super::*;

    // Offset for the Arcis circuit binary
    pub fn comp_def_offset() -> u64 {
        // In a real deployment, this points to where the circuit binary is in the account data
        // For now, we use a placeholder offset
        8 + 32 + 32 + 8 + 8 // After DaoAccount fixed fields
    }

    pub fn initialize_dao(ctx: Context<InitializeDao>, quorum_threshold: u64, authorized_mpc_node: Pubkey) -> Result<()> {
        let dao_state = &mut ctx.accounts.dao_state;
        dao_state.authority = ctx.accounts.authority.key();
        dao_state.authorized_mpc_node = authorized_mpc_node;
        dao_state.quorum_threshold = quorum_threshold;
        dao_state.proposal_count = 0;
        
        // Register the computation definition for private voting
        ctx.accounts.program.init_comp_def(
            dao_state.key(),
            comp_def_offset(), // Offset where the circuit binary is stored
        )?;

        Ok(())
    }

    pub fn create_proposal(ctx: Context<CreateProposal>, title: String, description: String, deadline: i64) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        let dao_state = &mut ctx.accounts.dao_state;

        proposal.id = dao_state.proposal_count;
        proposal.creator = ctx.accounts.creator.key();
        proposal.title = title;
        proposal.description = description;
        proposal.deadline = deadline;
        proposal.yes_votes = 0;
        proposal.no_votes = 0;
        proposal.total_votes = 0;
        proposal.status = ProposalStatus::Active;

        dao_state.proposal_count += 1;
        Ok(())
    }

    pub fn delegate_vote(ctx: Context<DelegateVote>, delegate: Pubkey, weight: u64) -> Result<()> {
        let delegation = &mut ctx.accounts.delegation;
        delegation.delegator = ctx.accounts.delegator.key();
        delegation.delegate = delegate;
        delegation.weight = weight;
        Ok(())
    }

    pub fn submit_encrypted_vote(ctx: Context<SubmitEncryptedVote>, encrypted_blob: Vec<u8>) -> Result<()> {
        let encrypted_vote = &mut ctx.accounts.encrypted_vote;
        encrypted_vote.voter = ctx.accounts.voter.key();
        encrypted_vote.proposal_id = ctx.accounts.proposal.id;
        encrypted_vote.encrypted_blob = encrypted_blob;
        encrypted_vote.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }


    #[encrypted]
    pub fn vote(ctx: Context<Vote>, vote_weight: Enc<Shared, u32>) -> Result<Enc<Shared, u32>> {
        // Tally logic executed inside MPC
        // We add this vote to the running tally
        // Implementation provided by Arcis circuit
        Ok(vote_weight)
    }

    #[arcium_callback]
    pub fn receive_tally(ctx: Context<ReceiveTally>, total_votes: u32) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        
        // Prevent double execution
        require!(proposal.status == ProposalStatus::Active, ErrorCode::VotingClosed);

        // Update proposal state
        proposal.total_votes = total_votes as u64;
        proposal.status = ProposalStatus::Passed; // Or logic based on quorum

        Ok(())
    }
}

#[derive(ArcisType)]
pub struct VoteValues {
    pub yes_weight: u64,
    pub no_weight: u64,
}

#[derive(Accounts)]
pub struct InitializeDao<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 32 + 8 + 8)]
    pub dao_state: Account<'info, DaoAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub program: Program<'info, crate::program::GovEncrypt>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateProposal<'info> {
    #[account(mut)]
    pub dao_state: Account<'info, DaoAccount>,
    #[account(init, payer = creator, space = 8 + 8 + 32 + 200 + 1000 + 8 + 8 + 8 + 2)] // Adjusted space estimate
    pub proposal: Account<'info, Proposal>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DelegateVote<'info> {
    #[account(init, payer = delegator, space = 8 + 32 + 32 + 8)]
    pub delegation: Account<'info, Delegation>,
    #[account(mut)]
    pub delegator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitEncryptedVote<'info> {
    #[account(init, payer = voter, space = 8 + 32 + 8 + 500 + 8)]
    pub encrypted_vote: Account<'info, EncryptedVote>,
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    #[account(mut)]
    pub voter: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    pub dao_state: Account<'info, DaoAccount>,
    #[account(mut)]
    pub mpc_node: Signer<'info>, 
}

#[account]
pub struct DaoAccount {
    pub authority: Pubkey,
    pub authorized_mpc_node: Pubkey,
    pub quorum_threshold: u64,
    pub proposal_count: u64,
}

#[account]
pub struct Proposal {
    pub id: u64,
    pub creator: Pubkey,
    pub title: String,
    pub description: String,
    pub deadline: i64,
    pub yes_votes: u64,
    pub no_votes: u64,
    pub total_votes: u64,
    pub status: ProposalStatus,
}

#[derive(Accounts)]
pub struct ReceiveTally<'info> {
    #[account(mut, has_one = authorized_mpc_node)]
    pub dao_state: Account<'info, DaoAccount>,
    #[account(mut)]
    pub proposal: Account<'info, Proposal>,
    pub authorized_mpc_node: Signer<'info>,
}

#[account]
pub struct Delegation {
    pub delegator: Pubkey,
    pub delegate: Pubkey,
    pub weight: u64,
}

#[account]
pub struct EncryptedVote {
    pub voter: Pubkey,
    pub proposal_id: u64,
    pub encrypted_blob: Vec<u8>,
    pub timestamp: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum ProposalStatus {
    Active,
    Passed,
    Failed,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Voting period is closed")]
    VotingClosed,
    #[msg("Invalid vote choice")]
    InvalidVoteChoice,
    #[msg("Unauthorized MPC node")]
    UnauthorizedNode,
}
