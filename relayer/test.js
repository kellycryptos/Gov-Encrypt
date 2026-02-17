const { web3 } = require('@coral-xyz/anchor');
const { PublicKey } = web3;
try {
    const pk = new PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
    console.log("PublicKey Success:", pk.toString());
} catch (e) {
    console.error("PublicKey Failed:", e);
}
