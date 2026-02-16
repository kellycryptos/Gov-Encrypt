# Contributing to Gov Encrypt

Thank you for your interest in contributing to Gov Encrypt, the privacy-native governance layer for serious DAOs.

## Code Standards
- **Rust (Anchor)**: Follow standard Rust formatting (`cargo fmt`). Ensure all unsafe code is documented.
- **Frontend**: Use strict TypeScript. No `any`. Institutional-grade UI components only.
- **Circuits**: Document input/output types clearly for Arcis compilation.

## Pull Request Process
1. Fork the repository and create your branch from `main`.
2. Ensure all tests pass:
   - `anchor test`
   - `npm run build` (Frontend)
3. Update documentation for any API changes.
4. Submit a PR with a comprehensive description of the changes and security implications.

## Security
This is a governance protocol handling encrypted state. **Security is paramount.**
- Do not commit private keys.
- Review all MPC circuit logic for information leakage.
