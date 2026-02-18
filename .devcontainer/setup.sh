#!/bin/bash
set -e

echo "Starting environment setup..."

# 1. Install Solana CLI
echo "Installing Solana CLI..."
sh -c "$(curl -sSfL https://release.solana.com/v1.18.4/install)"
export PATH="/home/vscode/.local/share/solana/install/active_release/bin:$PATH"

# 2. Install Anchor (using avm for speed)
echo "Installing Anchor CLI..."
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install 0.30.1
avm use 0.30.1

# 3. Install Global NPM tools
echo "Installing Yarn..."
npm install -g yarn

# 4. Environment Variables
echo 'export PATH="/home/vscode/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc
echo 'export PATH="/home/vscode/.avm/bin:$PATH"' >> ~/.bashrc

echo "Setup complete! Please reload the window or source ~/.bashrc."
