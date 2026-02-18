use anchor_lang::prelude::*;

declare_id!("PLACEHOLDER_PROGRAM_ID");

#[program]
pub mod gov_encrypt {
    use super::*;

    pub fn initialize_dao(ctx: Context<InitializeDao>, quorum_threshold: u64) -> Result<()> {
        let dao_state = &mut ctx.accounts.dao_state;
        dao_state.authority = ctx.accounts.authority.key();
        dao_state.quorum_threshold = quorum_threshold;
        dao_state.proposal_count = 0;
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

    pub fn vote(ctx: Context<Vote>, vote_choice: u8, weight: u64) -> Result<()> {
        let proposal = &mut ctx.accounts.proposal;
        
        // Simple logic for now, real logic would verify MPC node signature
        match vote_choice {
            1 => proposal.yes_votes += weight, // For
            2 => proposal.no_votes += weight,  // Against
            _ => return err!(ErrorCode::InvalidVoteChoice),
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeDao<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 32 + 8 + 8)]
    pub dao_state: Account<'info, DaoAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
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
    #[account(mut)] // Should be signer in real implementation to verify MPC node
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
    pub status: ProposalStatus,
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
