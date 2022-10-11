import "../scss/components/PostMusic.scss"
import { FormEvent, useEffect, useState, useRef } from "react"
import { useWalletContext } from "../WalletContext"
import { supportedWebUrls } from "../utils/SupportedMusicWebsites"

interface Props {
    handlePostMusic: Function,
}

export default function PostMusic(props: Props) {
    const [owner, setOwner] = useState("Anonymous user")
    const [musicUrl, setMusicUrl] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const [posting, setPosting] = useState<boolean>(false)
    const { ConnectToWallet, currentAccount } = useWalletContext()

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

    const [inputError, setInputError] = useState<null | string>(null)
    let urlType: string | null = null;

    const setLinkType = (link: string) => {
        supportedWebUrls.some(supportedUrl => {
            const regex = new RegExp(supportedUrl.regularExpression)
            if (regex.test(link)) {
                urlType = supportedUrl.website
                return true;
            }
            return false;
        })
    }

    const isInputValid = () => {
        setLinkType(musicUrl)
        if (musicUrl.length === 0) {
            setInputError("The input box is empty.")
            return false
        } else if (urlType === null) {
            setInputError("Please provide a valid music track url.")
            return false
        }

        setInputError(null)
        return true
    }

    function handleSubmit(e: FormEvent) {
        if (inputRef.current)
            inputRef.current.focus();
        setPosting(true)
        ConnectToWallet()
            .then((connected) => {
                if (!connected){
                    setInputError("Connect to wallet before posting your music.");
                    setPosting(false);
                }
                else if (isInputValid()) {
                    setMusicUrl("")
                    props.handlePostMusic(e, owner, musicUrl)
                        .then((isPosted: boolean|string) => {
                            if (isPosted !== true)
                                setInputError("Post cancelled: " + isPosted.toString().split(": ")[1]);
                            setPosting(false)
                        })
                }
                else{
                    setPosting(false)
                }
            })
    }

    return (
        <div className="post-music-component">
            <h1 className="title">🎶 Blochain Music Point</h1>
            <div className="sub-title">
                Let your favorite music rule the world. Post your music link here.
            </div>
            <div className="supported-links">
                <span className="supported-links-text">Currently supported links</span>
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
                <div className="error-box">
                    {inputError && inputError}
                </div>
                <button type="submit"
                    onClick={(e) => posting ? null : handleSubmit(e)}
                    className="send-music-button"
                >
                    {posting ? "Posting ..." : "Post music"}
                </button>
            </div>
        </div>
    )
}