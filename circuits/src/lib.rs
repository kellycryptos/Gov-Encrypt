use arcis::*;

#[arcis_circuit]
fn vote_aggregator(current_tally: Enc<Shared, u32>, vote: Enc<Shared, u32>) -> Enc<Shared, u32> {
    current_tally + vote
}
