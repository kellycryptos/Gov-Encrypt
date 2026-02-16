export const ARCIUM_ENDPOINT = process.env.NEXT_PUBLIC_ARCIUM_ENDPOINT || "http://localhost:8080";

export const getRelayerStatus = async () => {
    try {
        const response = await fetch(`${ARCIUM_ENDPOINT}/status`);
        return response.ok;
    } catch {
        return false;
    }
};
