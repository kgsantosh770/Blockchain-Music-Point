import ConnectToWalletButton from "./ConnectToWalletButton";
import "../scss/components/Header.scss"

export default function Header() {
    return (
        <header>
            <span className="app-title">
                Music Point
            </span>
            <ConnectToWalletButton />
        </header>
    )
}