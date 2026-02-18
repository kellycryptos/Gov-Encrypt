const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '../../target/deploy');
const KEYPAIR_PATH = path.join(TARGET_DIR, 'gov_encrypt-keypair.json');

// Ensure directory exists
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Generate new keypair
const kp = Keypair.generate();
const secretKey = "[" + kp.secretKey.toString() + "]";

// Write to file
fs.writeFileSync(KEYPAIR_PATH, secretKey);

console.log("Keypair generated at:", KEYPAIR_PATH);
console.log("Public Key:", kp.publicKey.toBase58());
