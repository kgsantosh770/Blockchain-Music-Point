import { useState } from "react";
import "../scss/components/ConnectToWallet.scss"
import { walletConnected, walletConnecting, walletConnectionError, walletNotConnected } from "../utils/ImagePaths";
import { useWalletContext } from "../WalletContext"


export default function ConnectToWalletButton() {

    const { isConnected, currentAccount, ConnectToWallet } = useWalletContext()
    const [triedConnecting, setTriedConnecting] = useState(false)
    const [connecting, setConnecting] = useState(false)


    function handleConnectClick() {
        if (!isConnected) {
            setConnecting(true)
            if(!triedConnecting)
                setTriedConnecting(true)
            ConnectToWallet()
                .then(() => setConnecting(false))
        }
    }

    function walletStatus() {
        if (connecting) {
            return "Connecting to wallet"
        }
        else if (isConnected) {
            return currentAccount
        }
        else {
            return "Connect wallet"
        }
    }

    function walletIcon() {
        if (connecting)
            return walletConnecting
        else if (isConnected)
            return walletConnected
        else if (triedConnecting)
            return walletConnectionError
        else
            return walletNotConnected
    }

    return (
        <div className="wallet-component">
            <button
                className={`wallet-connect-btn ${isConnected ? "connected" : "not-connected"}`}
                onClick={handleConnectClick}
            >
                {walletStatus()}
            </button>
            <img className="wallet"
                src={walletIcon()}
                alt="wallet"
                title="wallet"
            />
        </div>
    )
}