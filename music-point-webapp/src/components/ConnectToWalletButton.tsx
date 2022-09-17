import React, { useState, useEffect } from "react";
import "../scss/ConnectToWallet.scss"
import { useWalletContext } from "../WalletContext"

export default function ConnectToWalletButton() {

    const { isConnected, currentAccount, ConnectToWallet } = useWalletContext()

    const [connecting, setConnecting] = useState(false)


    function handleConnectClick() {
        if (!isConnected) {
            setConnecting(true)
            ConnectToWallet()
            setConnecting(false)
        }
    }

    function buttonText() {
        if (!isConnected)
            return "Connect your wallet"
        else
            return "Wallet Connected"
    }

    return (
        <button
            className={`wallet-connect-btn ${isConnected ? "connected" : "not-connected"}`}
            onClick={handleConnectClick}
            style={{ backgroundColor: isConnected ? "green" : "" }}
        >
            {connecting ? "Connecting ...." : buttonText()}
        </button>
    )
}