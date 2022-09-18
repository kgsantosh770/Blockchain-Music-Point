import "../scss/components/PostMusic.scss"
import { FormEvent, useEffect, useState, useRef } from "react"
import { ContractGetMusicCount } from "../contracts/MusicPointFunctions"
import { useWalletContext } from "../WalletContext"
import { supportedWebUrls } from "../utils/SupportedMusicWebsites"

interface Props {
    handlePostMusic: Function
}

export default function PostMusic(props: Props) {
    const { currentAccount } = useWalletContext()
    const [owner, setOwner] = useState("Anonymous user")
    const [musicUrl, setMusicUrl] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (currentAccount)
            setOwner(currentAccount)
    }, [currentAccount])

    function handleChange(event: FormEvent<HTMLInputElement>) {
        setMusicUrl(event.currentTarget.value)
    }

    
    const supportedLinks = supportedWebUrls.map((supportedUrl, i) => {
        return (
            <img
                key={i}
                className={`supported-link ${supportedUrl.website}`}
                src={supportedUrl.imagePath}
                alt={supportedUrl.website}
                title={supportedUrl.website}
            />
        )
    })

    return (
        <div className="post-music-component">
            <h1 className="title">🎶 Blochain Music Point</h1>
            <div className="sub-title">
                Let your favorite music rule the world. Post your music link here.
            </div>
            <div className="supported-links">
                <span className="supported-links-text">Supported links</span>
                {supportedLinks}
            </div>
            <div className="music-input-box">
                <input
                    name="musicUrl"
                    value={musicUrl}
                    ref={inputRef}
                    type="url"
                    placeholder="Enter your music url"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />

                <button type="submit"
                    onClick={(e) => {
                        if (inputRef.current)
                            inputRef.current.focus();
                        setMusicUrl("")
                        props.handlePostMusic(e, owner, musicUrl)
                    }}
                    className="send-music-button"
                >
                    Post music
                </button>
            </div>
        </div>
    )
}