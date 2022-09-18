import { FormEvent, useEffect, useState } from 'react'

import PostMusic from "./components/PostMusic"
import MusicBox from './components/MusicBox'
import ConnectToWallet from './components/ConnectToWalletButton'
import { useWalletContext } from "./WalletContext"

import "./scss/components/App.scss"
import Header from './components/Header'
import Footer from './components/Footer'
import OuterBox from './components/OuterBox'
import { ContractGetAllMusic, ContractPostMusic } from './contracts/MusicPointFunctions'
import { loadingAnimatedIcon } from './utils/ImagePaths'


function App() {

  const { currentAccount } = useWalletContext()

  interface Music {
    ownerAdress: string,
    musicUrl: string,
    timePosted: Date,
  }

  interface AllMusic extends Array<Music> { }

  const [allMusicData, setAllMusicData] = useState<AllMusic>([])
  const [musicsLoading, setMusicsLoading] = useState(false)

  useEffect(() => {
    setMusicsLoading(true)
    ContractGetAllMusic()
      .then(allMusic => {
        if(allMusic)
          setAllMusicData(allMusic)
      })
      .then(()=>setMusicsLoading(false))
  }, [])

  function handlePostMusic(event: FormEvent, _owner: string, _musicUrl: string) {
    event.preventDefault();
    const newMusicObject = {
      ownerAdress: _owner,
      musicUrl: _musicUrl,
      timePosted: new Date()
    }
    // ContractPostMusic(_musicUrl)
    //   .then(() => setAllMusicData([newMusicObject, ...allMusicData]))
  }

  const musicBoxes = (musicList: AllMusic, isChain = false) => musicList.map((data, i) =>
    <MusicBox key={i}
      owner={data.ownerAdress}
      isChain={isChain}
      musicUrl={data.musicUrl}
      timePosted={data.timePosted} />
  )

  const myMusics = allMusicData.filter(data => {
    return data.ownerAdress?.toLowerCase() == currentAccount?.toLowerCase();
  })

  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-8 col-md-12">
            <OuterBox>
              <PostMusic handlePostMusic={handlePostMusic} />
            </OuterBox>
            <OuterBox additionalClass='music-outer-box all-musics'>
              <h1 className='text-white font-weight-bold'>Musics Posted</h1>
              {
                musicsLoading ?
                  <img className='loading' src={loadingAnimatedIcon} alt="loading" title="loading" /> :
                  allMusicData.length === 0 ?
                    <div className='text-white mt-3 fst-italic'>
                      Be the first to create the <b>MUSIC GENESIS</b>
                    </div> :
                    musicBoxes(allMusicData, true)
              }

            </OuterBox>
          </div>
          <div className="col-lg-4 col-md-12">
            <OuterBox additionalClass='music-outer-box my-music'>
              <h1 className='text-white font-weight-bold'>My musics</h1>
              {
                musicsLoading ?
                  <img className='loading' src={loadingAnimatedIcon} alt="loading" title="loading" /> :
                  myMusics.length === 0 ?
                    <div className='text-white mt-3 fst-italic'>
                      You have not posted any music yet :(
                    </div> :
                    musicBoxes(myMusics)
              }
            </OuterBox>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
