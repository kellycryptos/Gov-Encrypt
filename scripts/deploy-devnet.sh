#!/bin/bash
solana config set --url devnet
# Check if program keypair exists, generate if not
if [ ! -f target/deploy/gov_encrypt-keypair.json ]; then
    echo "Generating new program keypair..."
    mkdir -p target/deploy
    solana-keygen new -o target/deploy/gov_encrypt-keypair.json --no-bip39-passphrase
fi

anchor build
anchor deploy --provider.cluster devnet
