import React, { FormEvent, useState, useEffect } from 'react';
import "./scss/App.scss";
import LinkInput from "./components/LinkInput";
import MusicBox from './components/MusicBox';
import ConnectToWallet from './components/ConnectToWalletButton';
import { useWalletContext } from "./WalletContext"
import { ContractPostMusic, ContractGetTotalMusic } from "./contracts/MusicPointFunctions"

function App() {

  const { currentAccount } = useWalletContext()

  interface Music {
    owner: string,
    musicUrl: string,
  }

  interface AllMusic extends Array<Music> { }

  const [allMusicData, setAllMusicData] = useState<AllMusic>([]);
  const [totalMusic, setTotalMusic] = useState(0);

  useEffect(()=>{
    ContractGetTotalMusic()
      .then(res => setTotalMusic(res))
  },[])

  const musicBoxes = allMusicData.map((data, i) =>
    <MusicBox key={i} owner={data.owner} musicUrl={data.musicUrl} />
  )

  function handlePostMusic(event: FormEvent, _owner: string, _musicUrl: string) {
    event.preventDefault();
    const newMusicObject = {
      owner: _owner,
      musicUrl: _musicUrl,
    }
    ContractPostMusic(_musicUrl)
      .then(() => setAllMusicData([newMusicObject, ...allMusicData]))
      .then(() => setTotalMusic(prevCount => prevCount+1))
  }


  return (
    <div className="App">
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
      <ConnectToWallet />
      {currentAccount.length !== 0 &&
        <>
          <LinkInput handleClick={handlePostMusic} />
          {musicBoxes}
        </>
      }
    </div>
  );
}

export default App;
