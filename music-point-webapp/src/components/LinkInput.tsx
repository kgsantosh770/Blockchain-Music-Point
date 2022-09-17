import { FormEvent, useEffect, useState, useRef } from "react"
import "../scss/components/LinkInput.scss"
import { useWalletContext } from "../WalletContext"

interface Props {
    handleClick: Function
}

export default function LinkInpu(props: Props) {

    const { currentAccount } = useWalletContext()
    const [owner, setOwner] = useState("Anonymous user")
    const [musicUrl, setMusicUrl] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(currentAccount.length !== 0)
            setOwner(currentAccount)
    },[currentAccount])
    
    function handleChange(event: FormEvent<HTMLInputElement>) {
        setMusicUrl(event.currentTarget.value)
    }

    return (
        <form className="music-input-box">
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
                    if(inputRef.current)
                        inputRef.current.focus();
                    setMusicUrl("")
                    props.handleClick(e, owner, musicUrl)
                }}
                className="send-music-button"
            >
                Post music
            </button>
        </form>
    )
}