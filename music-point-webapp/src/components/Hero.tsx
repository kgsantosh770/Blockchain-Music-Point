import "../scss/components/Hero.scss"
import { useEffect, useState } from "react"
import { ContractGetMusicCount } from "../contracts/MusicPointFunctions"

export default function Hero() {
    const [totalMusic, setTotalMusic] = useState(0);

    // useEffect(() => {
    //     ContractGetMusicCount()
    //         .then(res => setTotalMusic(res))
    // }, [])

    return (
        <div className="hero">
            <h1>👋 Hey everyone!</h1>
            <div className="bio">
                I am Santosh. This is my first blockchain project. Send a music link to me :)
            </div>
            <div className='total-music'>
                <span className="count">
                    {totalMusic}
                </span>
                members has shared music here !!!!
            </div>
        </div>
    )
}