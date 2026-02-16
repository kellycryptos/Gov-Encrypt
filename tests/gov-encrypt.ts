import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { GovEncrypt } from "../target/types/gov_encrypt";
import { assert } from "chai";

describe("gov-encrypt", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.GovEncrypt as Program<GovEncrypt>;

  let daoStatePda: anchor.web3.PublicKey;
  let proposalPda: anchor.web3.PublicKey;
  let treasuryStrategyPda: anchor.web3.PublicKey;

  it("Is initialized!", async () => {
    const [pda, _] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("dao_state")],
      program.programId
    );
    daoStatePda = pda;

    try {
        await program.methods
        .initializeDao(new anchor.BN(400)) // 4% quorum
        .accounts({
            daoState: daoStatePda,
            authority: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
    } catch (e) {
        // Might already be initialized in local test validator persistence
        console.log("DAO might already be initialized");
    }

    const account = await program.account.daoState.fetch(daoStatePda);
    assert.ok(account.authority.equals(provider.wallet.publicKey));
    assert.ok(account.quorumThreshold.eq(new anchor.BN(400)));
  });

  it("Creates a proposal", async () => {
    const account = await program.account.daoState.fetch(daoStatePda);
    const proposalCount = account.proposalCount;

    const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("proposal"), proposalCount.toArrayLike(Buffer, "le", 8)],
      program.programId
    );
    proposalPda = pda;

    const cid = "QmHash...";
    const now = Math.floor(Date.now() / 1000);

    await program.methods
      .createProposal(cid, new anchor.BN(now), new anchor.BN(now + 86400))
      .accounts({
        daoState: daoStatePda,
        proposal: proposalPda,
        proposer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const proposalAccount = await program.account.proposal.fetch(proposalPda);
    assert.equal(proposalAccount.cid, cid);
    assert.ok(proposalAccount.proposer.equals(provider.wallet.publicKey));
  });

  it("Submits an encrypted vote", async () => {
    const [votePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vote"), proposalPda.toBuffer(), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    const encryptedBlob = Buffer.from([1, 2, 3, 4]);

    await program.methods
      .submitEncryptedVote(encryptedBlob)
      .accounts({
        voteAccount: votePda,
        proposal: proposalPda,
        voter: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const voteAccount = await program.account.encryptedVote.fetch(votePda);
    assert.deepEqual(voteAccount.encryptedBlob, encryptedBlob);
  });

  it("Submits a private delegation", async () => {
    const [delegationPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("delegation"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    const encryptedBlob = Buffer.from([5, 6, 7, 8]);

    await program.methods
      .delegatePrivately(encryptedBlob)
      .accounts({
        delegation: delegationPda,
        delegator: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const delegationAccount = await program.account.encryptedDelegation.fetch(delegationPda);
    assert.deepEqual(delegationAccount.encryptedBlob, encryptedBlob);
  });
});
