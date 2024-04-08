import { onMounted, onUnmounted } from "vue";
import Web3 from "web3";

const isMetaMask = typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
const web3 = new Web3(window.ethereum)
async function connect() {
    if (isMetaMask) {
        try {
            const result = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            return result;
        } catch (e) {
            return "Error: Unable to execute request: " + e.message;
        }
    } else {
        return "Error: MetaMask not detected";
    }
}
async function getAccounts() {
    if (isMetaMask) {
        try {
            const result = await window.ethereum.request({
                method: "eth_accounts",
            });
            return result;
        } catch (e) {
            return "Error: Unable to execute request: " + e.message;
        }
    } else {
        return "Error: MetaMask not detected";
    }
}

async function switchAccounts() {
    if (isMetaMask) {
        try {
            const result = await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [
                    {
                        eth_accounts: {},
                    },
                ],
            });
            return result;
        } catch (e) {
            return "Error: Unable to execute request: " + e.message;
        }
    } else {
        return "Error: MetaMask not detected";
    }
}

/**
 * Add a token to MetaMask
 * @param symbol Symbol of the token, upto 5 characters
 * @param address Address of the token
 * @param imageURL String URL of the token image
 * @param decimals (Optional) 18 by default
 * @param type (Optional) ERC20 by default
 */
const addTokenToWallet = async ( symbol, address, imageURL, decimals = 18, type = "ERC20" )=> {
    await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
            type,
            options: {
                address, // The address that the token is at.
                symbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals, // The number of decimals in the token
                image: imageURL, // A string url of the token logo
            },
        },
    });
};

const switchOrAddChain = async ( chainId, chainConfig ) => {
    const chainIdHex = "0x" + parseInt(chainId.toString(), 10).toString(16);
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainIdHex }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902 && chainConfig) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: chainIdHex,
                            ...chainConfig,
                        },
                    ],
                });
            } catch (addError) {
                throw new Error(
                    "Couldn't add network, it's possible that user has rejected the change"
                );
            }
        } else {
            throw new Error("Couldn't switch networks. Error: " + switchError);
        }
    }
};

const onAccountsChanged = (callback) => {
    if (isMetaMask) {
        onMounted(() => {
            window.ethereum.on("accountsChanged", callback);
        });
        onUnmounted(() => {
            window.ethereum.removeListener("accountsChanged", callback);
        });
    }
};

const onChainChanged = (callback) => {
    if (isMetaMask) {
        onMounted(() => {
            window.ethereum.on("chainChanged", callback);
        });
        onUnmounted(() => {
            window.ethereum.removeListener("chainChanged", callback);
        });
    }
};

export const useWeb3 = () => ({
    web3,
    isMetaMask,
    connect,
    getAccounts,
    switchAccounts,
    addTokenToWallet,
    switchOrAddChain,
    onAccountsChanged,
    onChainChanged,
});

export default useWeb3;