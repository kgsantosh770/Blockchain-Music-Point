import React, { useState, useContext, useEffect } from "react";
declare var window: any;

interface defaultContextValueType {
    isConnected: boolean,
    currentAccount: string,
    ConnectToWallet: () => void
}

interface Props {
    children: React.ReactNode
}

const Context = React.createContext<defaultContextValueType>(undefined!)

function WalletContextProvider({ children }: Props) {
    const [currentAccount, setCurrentAccount] = useState("")
    const [isConnected, setIsConnected] = useState(false)

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
                setIsConnected(true);
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }


    const ConnectToWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
            setIsConnected(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    },[])

    return (
        <Context.Provider value={{ isConnected, currentAccount, ConnectToWallet }}>
            {children}
        </Context.Provider>
    )
}

const useWalletContext = () => {
    return useContext(Context);
};

export { WalletContextProvider, useWalletContext }