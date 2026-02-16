# Arcium MXE Node (Governance Relayer)

This layer handles the confidential processing of votes and delegation weights using Arcium's Secure Multiparty Computation (MPC).

## Production Setup (VPS)

### 1. Prerequisites
- Docker & Docker Compose
- 2 CPU, 4GB RAM (Minimum)
- Publicly accessible IP address

### 2. Environment Configuration
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
# Edit .env with your Relayer Key and RPC endpoint
```

### 3. Deployment
Run the node using Docker Compose:
```bash
docker-compose up -d --build
```

### 4. Node Registration
Once the container is running:
- The node will automatically attempt to register with the Arcium Network using `RELAYER_KEY`.
- Logs can be viewed via `docker-compose logs -f`.

## Arcis Circuits
The confidential logic is defined in `/circuits`:
- `private_delegation.arcis`: Handles weighted multi-hop delegation.
- `vote_tally.arcis`: Aggregates encrypted votes without revealing individual choices.

## API Endpoints
The node exposes a relayer API (default port 3001) for the frontend:
- `POST /api/submit-vote`: Forwards encrypted blobs to the MXE.
- `POST /api/tally`: Triggers the MPC execution and returns the final (unencrypted) result to the Solana program.
