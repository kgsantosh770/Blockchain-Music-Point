// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MusicPoint {

    event PostMusic(address indexed from, string musicUrl, uint256 postedTime);

    struct Music {
        address ownerAdress;
        string url;
        uint256 timestamp;
    }

    Music[] musics;

    constructor() {
        console.log("Yo yo, I am a music contract and I am smart");
    }

    function postMusic(string memory _url) public {
        console.log("%s has posted music! - %s", msg.sender, _url);
        musics.push(Music(msg.sender, _url, block.timestamp));
        emit PostMusic(msg.sender, _url, block.timestamp);
    }

    function getTotalMusic() public view returns (uint256) {
        console.log("We have %d total music!", musics.length);
        return musics.length;
    }
}