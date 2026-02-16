use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod gov_encrypt {
    use super::*;

    pub fn initialize_dao(ctx: Context<InitializeDao>, quorum_threshold: u64) -> Result<()> {
        let dao_state = &mut ctx.accounts.dao_state;
        dao_state.authority = ctx.accounts.authority.key();
        dao_state.proposal_count = 0;
        dao_state.quorum_threshold = quorum_threshold;
        dao_state.authorized_mpc_node = ctx.accounts.authority.key(); // Initial node is authority
        msg!("DAO Initialized with quorum threshold: {}", quorum_threshold);
        Ok(())
    }

    pub fn set_authorized_node(ctx: Context<UpdateDao>, new_node: Pubkey) -> Result<()> {
        let dao_state = &mut ctx.accounts.dao_state;
        dao_state.authorized_mpc_node = new_node;
        msg!("Authorized MPC node updated: {}", new_node);
        Ok(())
    }

    pub fn initialize_reputation(ctx: Context<InitializeReputation>, commitment: Vec<u8>) -> Result<()> {
        let rep = &mut ctx.accounts.reputation;
        rep.owner = ctx.accounts.owner.key();
        rep.encrypted_commitment = commitment;
        msg!("Reputation commitment initialized for: {}", rep.owner);
        Ok(())
    }

    pub fn create_proposal(
        ctx: Context<CreateProposal>, 
        cid: String, 
        start_time: i64, 
        end_time: i64
    ) -> Result<()> {
        let dao_state = &mut ctx.accounts.dao_state;
        let proposal = &mut ctx.accounts.proposal;
        
        proposal.id = dao_state.proposal_count;
        proposal.proposer = ctx.accounts.proposer.key();
        proposal.cid = cid;
        proposal.start_time = start_time;
        proposal.end_time = end_time;
        proposal.status = ProposalStatus::Active;
        proposal.final_yes_votes = 0;
        proposal.final_no_votes = 0;

        dao_state.proposal_count += 1;
        
        msg!("Proposal created: {}", proposal.id);
        Ok(())
    }

    pub fn submit_encrypted_vote(
        ctx: Context<SubmitVote>, 
        encrypted_vote_blob: Vec<u8>
    ) -> Result<()> {
        let proposal = &ctx.accounts.proposal;
        let now = Clock::get()?.unix_timestamp;

        require!(
            now >= proposal.start_time,
            GovError::VotingNotStarted
        );
        require!(
            now <= proposal.end_time,
            GovError::VotingEnded
        );

        let vote_account = &mut ctx.accounts.encrypted_vote_account;
        vote_account.voter = ctx.accounts.voter.key();
        vote_account.proposal_id = proposal.id;
        vote_account.encrypted_blob = encrypted_vote_blob;
        vote_account.timestamp = now;
        
        msg!("Encrypted vote submitted for proposal: {}", proposal.id);
        Ok(())
    }

    pub fn delegate_privately(
        ctx: Context<DelegateVote>, 
        encrypted_delegation_blob: Vec<u8>
    ) -> Result<()> {
        let delegation = &mut ctx.accounts.delegation_commitment_account;
        delegation.delegator = ctx.accounts.delegator.key();
        delegation.encrypted_blob = encrypted_delegation_blob;
        delegation.timestamp = Clock::get()?.unix_timestamp;
        
        msg!("Private delegation submitted by: {}", ctx.accounts.delegator.key());
        Ok(())
    }

    pub fn submit_treasury_strategy(
        ctx: Context<SubmitStrategy>,
        encrypted_strategy: Vec<u8>
    ) -> Result<()> {
        let strategy = &mut ctx.accounts.strategy;
        strategy.proposer = ctx.accounts.proposer.key();
        strategy.encrypted_params = encrypted_strategy;
        strategy.timestamp = Clock::get()?.unix_timestamp;
        
        msg!("Treasury strategy submitted for simulation: {}", strategy.key());
        Ok(())
    }

    pub fn submit_simulation_result(
        ctx: Context<SubmitSimulation>,
        risk_score: u64,
        is_safe: bool,
        proof: Vec<u8>
    ) -> Result<()> {
        require!(
            ctx.accounts.mpc_node.key() == ctx.accounts.dao_state.authorized_mpc_node,
            GovError::UnauthorizedNode
        );

        let result = &mut ctx.accounts.simulation_result;
        result.strategy = ctx.accounts.strategy.key();
        result.risk_score = risk_score;
        result.is_safe = is_safe;
        result.proof = proof;
        
        msg!("Simulation result submitted. Safe: {}", is_safe);
        Ok(())
    }

    pub fn finalize_proposal(
        ctx: Context<FinalizeProposal>,
        final_yes_votes: u64,
        final_no_votes: u64,
        proof: Vec<u8>
    ) -> Result<()> {
        require!(
            ctx.accounts.mpc_node.key() == ctx.accounts.dao_state.authorized_mpc_node,
            GovError::UnauthorizedNode
        );

        let proposal = &mut ctx.accounts.proposal;
        let dao_state = &ctx.accounts.dao_state;

        proposal.final_yes_votes = final_yes_votes;
        proposal.final_no_votes = final_no_votes;
        
        let total_votes = final_yes_votes + final_no_votes;
        
        if total_votes >= dao_state.quorum_threshold {
             if final_yes_votes > final_no_votes {
                proposal.status = ProposalStatus::Passed;
            } else {
                proposal.status = ProposalStatus::Failed;
            }
        } else {
             proposal.status = ProposalStatus::Failed;
             msg!("Quorum not met");
        }

        msg!("Proposal finalized. Status: {:?}", proposal.status);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeDao<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 8 + 32,
        seeds = [b"dao_state"],
        bump
    )]
    pub dao_state: Account<'info, DaoAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateDao<'info> {
    #[account(mut, seeds = [b"dao_state"], bump, has_one = authority)]
    pub dao_state: Account<'info, DaoAccount>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct InitializeReputation<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 64, // Vec<u8> approx
        seeds = [b"reputation", owner.key().as_ref()],
        bump
    )]
    pub reputation: Account<'info, ReputationCommitmentAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(cid: String)]
pub struct CreateProposal<'info> {
    #[account(mut)]
    pub dao_state: Account<'info, DaoAccount>,
    #[account(
        init,
        payer = proposer,
        space = 8 + 8 + 32 + (4 + cid.len()) + 8 + 8 + 1 + 8 + 8,
        seeds = [b"proposal", dao_state.proposal_count.to_le_bytes().as_ref()],
        bump
    )]
    pub proposal: Account<'info, ProposalAccount>,
    #[account(mut)]
    pub proposer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(encrypted_vote_blob: Vec<u8>)]
pub struct SubmitVote<'info> {
    #[account(
        init,
        payer = voter,
        space = 8 + 32 + 8 + (4 + encrypted_vote_blob.len()) + 8,
        seeds = [b"vote", proposal.key().as_ref(), voter.key().as_ref()],
        bump
    )]
    pub encrypted_vote_account: Account<'info, EncryptedVoteAccount>,
    #[account(mut)]
    pub proposal: Account<'info, ProposalAccount>,
    #[account(mut)]
    pub voter: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(encrypted_delegation_blob: Vec<u8>)]
pub struct DelegateVote<'info> {
    #[account(
        init,
        payer = delegator,
        space = 8 + 32 + (4 + encrypted_delegation_blob.len()) + 8,
        seeds = [b"delegation", delegator.key().as_ref()],
        bump
    )]
    pub delegation_commitment_account: Account<'info, DelegationCommitmentAccount>,
    #[account(mut)]
    pub delegator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(encrypted_strategy: Vec<u8>)]
pub struct SubmitStrategy<'info> {
    #[account(
        init,
        payer = proposer,
        space = 8 + 32 + (4 + encrypted_strategy.len()) + 8,
        seeds = [b"strategy", proposer.key().as_ref(), Clock::get()?.unix_timestamp.to_le_bytes().as_ref()],
        bump
    )]
    pub strategy: Account<'info, TreasuryStrategyAccount>,
    #[account(mut)]
    pub proposer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(risk_score: u64, is_safe: bool, proof: Vec<u8>)]
pub struct SubmitSimulation<'info> {
    #[account(
        init,
        payer = mpc_node,
        space = 8 + 32 + 8 + 1 + (4 + proof.len()),
        seeds = [b"simulation", strategy.key().as_ref()],
        bump
    )]
    pub simulation_result: Account<'info, SimulationResultAccount>,
    pub dao_state: Account<'info, DaoAccount>,
    pub strategy: Account<'info, TreasuryStrategyAccount>,
    #[account(mut)]
    pub mpc_node: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(final_yes_votes: u64, final_no_votes: u64, proof: Vec<u8>)]
pub struct FinalizeProposal<'info> {
    #[account(mut)]
    pub proposal: Account<'info, ProposalAccount>,
    pub dao_state: Account<'info, DaoAccount>,
    #[account(mut)]
    pub mpc_node: Signer<'info>,
}


#[account]
pub struct DaoAccount {
    pub authority: Pubkey,
    pub proposal_count: u64,
    pub quorum_threshold: u64,
    pub authorized_mpc_node: Pubkey,
}

#[account]
pub struct ProposalAccount {
    pub id: u64,
    pub proposer: Pubkey,
    pub cid: String,
    pub start_time: i64,
    pub end_time: i64,
    pub status: ProposalStatus,
    pub final_yes_votes: u64,
    pub final_no_votes: u64,
}

#[account]
pub struct EncryptedVoteAccount {
    pub voter: Pubkey,
    pub proposal_id: u64,
    pub encrypted_blob: Vec<u8>,
    pub timestamp: i64,
}

#[account]
pub struct DelegationCommitmentAccount {
    pub delegator: Pubkey,
    pub encrypted_blob: Vec<u8>,
    pub timestamp: i64,
}

#[account]
pub struct TreasuryStrategyAccount {
    pub proposer: Pubkey,
    pub encrypted_params: Vec<u8>,
    pub timestamp: i64,
}

#[account]
pub struct SimulationResultAccount {
    pub strategy: Pubkey,
    pub risk_score: u64,
    pub is_safe: bool,
    pub proof: Vec<u8>,
}

#[account]
pub struct ReputationCommitmentAccount {
    pub owner: Pubkey,
    pub encrypted_commitment: Vec<u8>, 
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum ProposalStatus {
    Active,
    Passed,
    Failed,
}

#[error_code]
pub enum GovError {
    #[msg("The provided MPC node is not authorized to submit results.")]
    UnauthorizedNode,
    #[msg("Voting period has not started.")]
    VotingNotStarted,
    #[msg("Voting period has ended.")]
    VotingEnded,
    #[msg("Insufficient reputation for this action.")]
    InsufficientReputation,
}

