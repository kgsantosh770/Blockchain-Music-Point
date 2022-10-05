const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const musicContractFactory = await hre.ethers.getContractFactory("MusicPoint");
    const musicContract = await musicContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await musicContract.deployed();

    console.log("Contract deployed to: ", musicContract.address);
    console.log("Contract owner: ", owner.address)

    //Get Contract balance
    let contractBalance = await hre.ethers.provider.getBalance(musicContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    //Get all musics
    let allMusic = await musicContract.getAllMusic();
    console.log("Musics posted till date: \n", allMusic)

    //Get initial music count
    let musicCount = await musicContract.getMusicCount();
    console.log("Initial music count: ", musicCount)

    //Post a music as owner
    console.log("Posting music ...");
    let musicTxn = await musicContract.postMusic("music url 1");
    await musicTxn.wait();
    console.log("Music posted successfully");

    //Get music count after posting
    musicCount = await musicContract.getMusicCount();
    console.log("Total music: ", musicCount)

    //Get Contract balance
    contractBalance = await hre.ethers.provider.getBalance(musicContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    // Post a music using another account
    console.log("Posting music as a random person ...");
    musicTxn = await musicContract.connect(randomPerson).postMusic("music url 1");
    await musicTxn.wait();
    console.log("Music posted successfully");

    //Get total music count
    musicCount = await musicContract.getMusicCount();
    console.log("Total music: ", musicCount)

    //Get all musics
    // allMusic = await musicContract.getAllMusic();
    // console.log("Musics posted till date: \n", allMusic);

    //Get Contract balance
    contractBalance = await hre.ethers.provider.getBalance(musicContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    //Post a music as owner before 15 min time gap
    console.log("Posting music ...");
    musicTxn = await musicContract.connect(owner).postMusic("music url 1");
    await musicTxn.wait();
    console.log("Music posted successfully");

    //Get music count after posting
    musicCount = await musicContract.getMusicCount();
    console.log("Total music: ", musicCount)

    //Get Contract balance
    contractBalance = await hre.ethers.provider.getBalance(musicContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log("Error occured: ", error);
        process.exit(1);
    }
}

runMain();