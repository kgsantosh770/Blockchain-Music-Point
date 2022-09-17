import "../scss/components/PostMusic.scss"
import { FormEvent, useEffect, useState, useRef } from "react"
import { ContractGetMusicCount } from "../contracts/MusicPointFunctions"
import { useWalletContext } from "../WalletContext"
import * as icons from "../utils/ImagePaths"
import { supportedWebUrls } from "../utils/SupportedMusicWebsites"

interface Props {
    handleClick: Function
}


export default function PostMusic() {
    const [totalMusic, setTotalMusic] = useState(0);

    // useEffect(() => {
    //     ContractGetMusicCount()
    //         .then(res => setTotalMusic(res))
    // }, [])

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

    function handlePostMusic(event: FormEvent, _owner: string, _musicUrl: string) {
        event.preventDefault();
        const newMusicObject = {
            owner: _owner,
            musicUrl: _musicUrl,
        }
        // ContractPostMusic(_musicUrl)
        //   .then(() => setAllMusicData([newMusicObject, ...allMusicData]))
        //   .then(() => setTotalMusic(prevCount => prevCount+1))
    }


    const supportedLinks = supportedWebUrls.map(supportedUrl => {
        return (
            <img
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
                Supported links
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
                    required
                />

                <button type="submit"
                    onClick={(e) => {
                        if (inputRef.current)
                            inputRef.current.focus();
                        setMusicUrl("")
                        handlePostMusic(e, owner, musicUrl)
                    }}
                    className="send-music-button"
                >
                    Post music
                </button>
            </div>
        </div>
    )
}