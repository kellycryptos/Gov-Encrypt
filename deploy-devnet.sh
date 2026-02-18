#!/bin/bash
set -e

# Configuration
CLUSTER="devnet"
PROGRAM_NAME="gov_encrypt"
FRONTEND_CONSTANTS="./frontend/lib/program.ts"
RELAYER_ENV="./relayer/.env"

echo "=========================================="
echo "   Gov-Encrypt Devnet Deployment Script"
echo "=========================================="

# 1. Setup Solana Config
echo "[1/6] Configuring Solana for Devnet..."
solana config set --url $CLUSTER

# 2. Keypair Management
echo "[2/6] Checking Deploy Keypair..."
TARGET_DIR="./target/deploy"
KEYPAIR="$TARGET_DIR/$PROGRAM_NAME-keypair.json"

if [ ! -f "$KEYPAIR" ]; then
    echo "Creating target directory and generating new keypair..."
    mkdir -p $TARGET_DIR
    solana-keygen new --outfile "$KEYPAIR" --no-bip39-passphrase --force
else
    echo "Keypair found at $KEYPAIR"
fi

PUBKEY=$(solana-keygen pubkey "$KEYPAIR")
echo "Program ID: $PUBKEY"

# 3. Airdrop
echo "[3/6] Requesting Airdrop (2 SOL)..."
solana airdrop 2 "$KEYPAIR" || echo "Airdrop failed (might already have funds or rate limited). Continuing..."

# 4. Update Source Code with Program ID
echo "[4/6] Updating Program IDs in source..."

# Update lib.rs
# Find current declare_id! and replace
sed -i "s/declare_id!(\".*\");/declare_id!(\"$PUBKEY\");/" program/src/lib.rs

# Update Anchor.toml
sed -i "s/$PROGRAM_NAME = \".*\"/$PROGRAM_NAME = \"$PUBKEY\"/" Anchor.toml

# Update Frontend
# Assuming format: const PROGRAM_ID = ... "..."
sed -i "s/NEXT_PUBLIC_PROGRAM_ID || \".*\"/NEXT_PUBLIC_PROGRAM_ID || \"$PUBKEY\"/" "$FRONTEND_CONSTANTS"

# Update Relayer
sed -i "s/PROGRAM_ID=.*/PROGRAM_ID=$PUBKEY/" "$RELAYER_ENV"

echo "Source updated with $PUBKEY"

# 5. Build & Deploy
echo "[5/6] Building and Deploying..."
anchor build
anchor deploy --provider.cluster $CLUSTER

# 6. Sync IDL
echo "[6/6] Syncing IDL..."
cp "target/idl/$PROGRAM_NAME.json" "frontend/src/idl/$PROGRAM_NAME.json"
cp "target/idl/$PROGRAM_NAME.json" "relayer/src/$PROGRAM_NAME.json"

echo "=========================================="
echo "   Deployment Complete!"
echo "   Program ID: $PUBKEY"
echo "=========================================="
