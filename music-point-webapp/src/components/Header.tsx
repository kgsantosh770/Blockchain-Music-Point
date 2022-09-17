import ConnectToWalletButton from "./ConnectToWalletButton";
import { logo } from "../utils/ImagePaths"

import "../scss/components/Header.scss"

export default function Header() {
    return (
        <header>
            <a href="/" className="homepage-link">
                <img src={logo} alt="blockchain" title="Portfolio" className="portfolio-link-icon" />
            </a>
            <span className="app-title">
                Music Point
            </span>
            <ConnectToWalletButton />
        </header>
    )
}