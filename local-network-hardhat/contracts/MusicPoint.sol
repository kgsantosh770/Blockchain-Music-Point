// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MusicPoint {
    uint256 private seed;
    mapping(address => uint) lastPostedAt;

    constructor() payable {
        seed = (block.difficulty + block.timestamp) % 100;
    }

    event PostMusic(address indexed from, string musicUrl, uint256 postedTime);

    struct Music {
        address ownerAdress;
        string url;
        uint256 timestamp;
    }

    Music[] musics;

    function getRandomNumber() private view returns (uint256) {
        return (block.timestamp + block.difficulty + seed) % 100;
    }

    function sendEther() public {
        uint256 percentChance = 50;
        uint256 randomNumber = getRandomNumber();
        console.log("Random seed: ", randomNumber);
        if (randomNumber < percentChance) {
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more amount than available amount"
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to send ether");
        }
    }

    function postMusic(string memory _url) public {
        require(
            lastPostedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait for 15 minutes between your posts."
        );
        lastPostedAt[msg.sender] = block.timestamp;
        musics.push(Music(msg.sender, _url, block.timestamp));
        emit PostMusic(msg.sender, _url, block.timestamp);
        sendEther();
    }

    function getMusicCount() public view returns (uint256) {
        return musics.length;
    }

    function getAllMusic() public view returns (Music[] memory) {
        return musics;
    }
}
