import { FormEvent, useState } from 'react'

import Hero from "./components/Hero"
import LinkInput from "./components/LinkInput"
import MusicBox from './components/MusicBox'
import ConnectToWallet from './components/ConnectToWalletButton'
import { useWalletContext } from "./WalletContext"

import "./scss/components/App.scss"


function App() {

  const { currentAccount } = useWalletContext()

  interface Music {
    owner: string,
    musicUrl: string,
  }

  interface AllMusic extends Array<Music> { }

  const [allMusicData, setAllMusicData] = useState<AllMusic>([]);

  const musicBoxes = allMusicData.map((data, i) =>
    <MusicBox key={i} owner={data.owner} musicUrl={data.musicUrl} />
  )

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


  return (
    <div className="App">
      <Hero />
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
