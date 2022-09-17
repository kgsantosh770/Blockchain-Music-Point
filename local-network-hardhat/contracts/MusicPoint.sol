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

    function postMusic(string memory _url) public {
        musics.push(Music(msg.sender, _url, block.timestamp));
        emit PostMusic(msg.sender, _url, block.timestamp);
    }

    function getMusicCount() public view returns (uint256) {
        return musics.length;
    }

    function getAllMusic() public view returns(Music[] memory) {
        return musics;
    }
}