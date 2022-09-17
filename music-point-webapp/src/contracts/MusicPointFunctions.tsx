import React from "react"
import { ethers } from "ethers"
import {MusicPointData} from "../utils/MusicPointData"

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
      let count = await musicPortalContract.getTotalMusic();
      console.log("Retrieved total music count...", count.toNumber());

      const musicTxn = await musicPortalContract.postMusic(url);
      console.log("Mining...", musicTxn.hash);

      await musicTxn.wait();
      console.log("Mined -- ", musicTxn.hash);

      count = await musicPortalContract.getTotalMusic();
      console.log("Retrieved total music count...", count.toNumber());
    }
  } catch (error) {
    console.log(error);
  }
}

const getTotalMusic = async () => {
  try {
    const musicPortalContract = getMusicPortalContract();
    console.log("came in gettotalmusic sol function")
    
    if (musicPortalContract) {
      let count = await musicPortalContract.getTotalMusic();
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
  getTotalMusic as ContractGetTotalMusic
}