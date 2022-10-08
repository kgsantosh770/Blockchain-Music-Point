import React, { useState, useContext, useEffect } from "react";
declare var window: any;

interface defaultContextValueType {
    isConnected: boolean,
    currentAccount: string | null,
    ConnectToWallet: () => Promise<boolean>,
}

interface Props {
    children: React.ReactNode
}

const Context = React.createContext<defaultContextValueType>(undefined!)
const { ethereum } = window

function WalletContextProvider({ children }: Props) {
    const [currentAccount, setCurrentAccount] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    console.log("isConnected: ", isConnected)
    
    useEffect(() => {
        if(ethereum && ethereum.selectedAddress){
            ConnectToWallet()
        }
    }, [])

    const ConnectToWallet = async () => {
        try {
            if (ethereum) {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                console.log("Connected", accounts[0]);
                setCurrentAccount(accounts[0]);
                setIsConnected(true)
                return true;
            } else {
                alert("Get MetaMask!");
                return false;
            }
        } catch (error) {
            setIsConnected(false)
            console.log(error)
            return false;
        }
    }


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