import { ethers } from "ethers"
import { MusicPointData } from "../utils/MusicPointData"

declare var window: any

function getMusicPortalContract() {
  const contractAddress = MusicPointData.contractAddress
  const contractABI = MusicPointData.abi
  const { ethereum } = window;
  console.log("got ethereum in sol")
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    console.log("got provider in sol", provider)
    const signer = provider.getSigner();
    console.log("got signer in sol", signer)
    const musicPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log("returning musicportalcontract", musicPortalContract)
    return musicPortalContract
  }
  return false;
}

const postMusic = async (url: string) => {
  try {
    const musicPortalContract = getMusicPortalContract();
    console.log("came in postmusic sol function")

    if (musicPortalContract) {
      let count = await musicPortalContract.getMusicCount();
      console.log("Retrieved total music count...", count.toNumber());

      const musicTxn = await musicPortalContract.postMusic(url);
      console.log("Mining...", musicTxn.hash);

      await musicTxn.wait();
      console.log("Mined -- ", musicTxn.hash);

      count = await musicPortalContract.getMusicCount();
      console.log("Retrieved total music count...", count.toNumber());
      return true
    }
  } catch (error: any) {
    console.error(error);
    return error.reason;
  }
  return false
}

const getAllMusic = async () => {
  try {
    const musicPortalContract = getMusicPortalContract();
    if (musicPortalContract) {
      let allMusic = await musicPortalContract.getAllMusic();
      console.log(allMusic)
      let musicCleaned: { ownerAdress: string; timePosted: Date; musicUrl: string }[] = [];
      allMusic.forEach((music: any) => {
        musicCleaned.push({
          ownerAdress: music.ownerAdress,
          timePosted: new Date(music.timestamp * 1000),
          musicUrl: music.url
        });
      });
      return musicCleaned;
    }
  } catch (error) {
    console.log(error);
  }
}

const getMusicCount = async () => {
  try {
    const musicPortalContract = getMusicPortalContract();

    if (musicPortalContract) {
      let count = await musicPortalContract.getMusicCount();
      count = count.toNumber();
      console.log(count, " total music")
      return count;
    }
  } catch (error) {
    console.log(error);
  }
  return 0;
}

export {
  postMusic as ContractPostMusic,
  getMusicCount as ContractGetMusicCount,
  getAllMusic as ContractGetAllMusic,
  getMusicPortalContract as getContract,
}