import { FormEvent, useState } from 'react'

import Hero from "./components/PostMusic"
import MusicBox from './components/MusicBox'
import ConnectToWallet from './components/ConnectToWalletButton'
import { useWalletContext } from "./WalletContext"

import "./scss/components/App.scss"
import Header from './components/Header'
import Footer from './components/Footer'


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

  


  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-8 col-md-12">
            <Hero />
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
