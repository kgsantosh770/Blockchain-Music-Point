import { FormEvent, useEffect, useState } from 'react'

import PostMusic from "./components/PostMusic"
import SingleMusicCard from './components/SingleMusicCard'
import { useWalletContext } from "./WalletContext"

import "./scss/components/App.scss"
import Header from './components/Header'
import Footer from './components/Footer'
import OuterBox from './components/OuterBox'
import { ContractGetAllMusic, ContractPostMusic } from './contracts/MusicPointFunctions'

function App() {

  const { currentAccount, isConnected } = useWalletContext()

  interface Music {
    ownerAdress: string,
    musicUrl: string,
    timePosted: Date,
  }

  interface AllMusic extends Array<Music> { }

  const [allMusicData, setAllMusicData] = useState<AllMusic>([])
  const [musicsLoading, setMusicsLoading] = useState(false)

  useEffect(() => {
    if (isConnected) {
      getMusicsFromBlockchain();
    }
  }, [isConnected])

  const getMusicsFromBlockchain = async () => {
    setMusicsLoading(true)
    ContractGetAllMusic()
      .then(allMusic => {
        if (allMusic)
          setAllMusicData(allMusic.reverse())
      })
      .then(() => setMusicsLoading(false))
  }

  const handlePostMusic = async (event: FormEvent, _owner: string, _musicUrl: string) => {
    event.preventDefault();
    const newMusicObject = {
      ownerAdress: _owner,
      musicUrl: _musicUrl,
      timePosted: new Date()
    }
    return ContractPostMusic(_musicUrl)
      .then((posted) => {
        if(posted)
          setAllMusicData([newMusicObject, ...allMusicData])
        return posted
      })
  }

  const musicBoxes = (musicList: AllMusic, isChain = false) => musicList.map((data, i) =>
    <SingleMusicCard key={i}
      owner={data.ownerAdress}
      isChain={isChain}
      musicUrl={data.musicUrl}
      timePosted={data.timePosted} />
  )

  const myMusics = allMusicData.filter(data => {
    return data.ownerAdress?.toLowerCase() === currentAccount?.toLowerCase();
  })

  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-8 col-md-12">
            <OuterBox>
              <PostMusic handlePostMusic={handlePostMusic}/>
            </OuterBox>
            <OuterBox
              additionalClass='music-outer-box all-musics'
              boxTitle='Musics Posted'
              isContentLoading={musicsLoading}
              defaultBoxMsg={allMusicData.length === 0 ? "Be the first to create the MUSIC GENESIS" : null}
            >
              {musicBoxes(allMusicData, true)}
            </OuterBox>
          </div>
          <div className="col-lg-4 col-md-12">
            <OuterBox
              additionalClass='music-outer-box my-music'
              boxTitle='My musics'
              isContentLoading={musicsLoading}
              defaultBoxMsg={myMusics.length === 0 ? "You have not posted any music yet :(" : null}
            >
              {musicBoxes(myMusics)}
            </OuterBox>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
