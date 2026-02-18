#!/bin/bash
solana config set --url devnet
anchor build
anchor deploy --provider.cluster devnet
