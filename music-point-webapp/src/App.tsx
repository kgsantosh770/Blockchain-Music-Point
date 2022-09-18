import { FormEvent, useState } from 'react'

import PostMusic from "./components/PostMusic"
import MusicBox from './components/MusicBox'
import ConnectToWallet from './components/ConnectToWalletButton'
import { useWalletContext } from "./WalletContext"

import "./scss/components/App.scss"
import Header from './components/Header'
import Footer from './components/Footer'
import OuterBox from './components/OuterBox'


function App() {

  const { currentAccount } = useWalletContext()

  interface Music {
    owner: string,
    musicUrl: string,
    timePosted: Date,
  }

  interface AllMusic extends Array<Music> { }

  const dummyData = [
    {
      owner: "owner",
      musicUrl: "https://spotify.com/my-link-url",
      timePosted: new Date("11/10/2021")
    },
    {
      owner: "owner",
      musicUrl: "https://spotify.com/my-link-url",
      timePosted: new Date()
    },
    {
      owner: "owner",
      musicUrl: "https://spotify.com/my-link-url",
      timePosted: new Date()
    }
  ]
  const [allMusicData, setAllMusicData] = useState<AllMusic>(dummyData);

  function handlePostMusic(event: FormEvent, _owner: string, _musicUrl: string) {
    event.preventDefault();
    const newMusicObject = {
      owner: _owner,
      musicUrl: _musicUrl,
      timePosted: new Date()
    }
    // ContractPostMusic(_musicUrl)
    //   .then(() => setAllMusicData([newMusicObject, ...allMusicData]))
    //   .then(() => setTotalMusic(prevCount => prevCount+1))
  }

  const musicBoxes = allMusicData.map((data, i) =>
    <MusicBox key={i} owner={data.owner} musicUrl={data.musicUrl} timePosted={data.timePosted} />
  )

  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-8 col-md-12">
            <OuterBox>
              <PostMusic handlePostMusic={handlePostMusic} />
            </OuterBox>
            <OuterBox>
              <h1 style={{color: "white", fontWeight: "bold"}}>Musics Posted</h1>
              {musicBoxes}
            </OuterBox>
          </div>
          <div className="col-lg-4 col-md-12">

          </div>
        </div>
      </div>
      {/* <Hero />
      <ConnectToWallet />
      {currentAccount.length !== 0 &&
        <>
          <LinkInput handleClick={handlePostMusic} />
          {musicBoxes}
        </>
      } */}
      <Footer />
    </div>
  );
}

export default App;
