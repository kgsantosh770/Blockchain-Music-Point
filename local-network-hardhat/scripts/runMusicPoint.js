const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const musicContractFactory = await hre.ethers.getContractFactory("MusicPoint");
    const musicContract = await musicContractFactory.deploy();
    await musicContract.deployed();

    console.log("Contract deployed to: ", musicContract.address);
    console.log("Contract owner: ", owner)
    
    //Get all musics
    let allMusic = await musicContract.getAllMusic();
    console.log("Musics posted till date: \n",allMusic)

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

    //Post a music using another account
    console.log("Posting music as a random person ...");
    musicTxn = await musicContract.connect(randomPerson).postMusic("music url 1");
    await musicTxn.wait();
    console.log("Music posted successfully");

    //Get total music count
    musicCount = await musicContract.getMusicCount();
    console.log("Total music: ", musicCount)

    //Get all musics
    allMusic = await musicContract.getAllMusic();
    console.log("Musics posted till date: \n",allMusic);
}

const runMain = async() => {
    try{
        await main();
        process.exit(0);
    } catch(error) {
        console.log("Error occured: ",error);
        process.exit(1);
    }
}

runMain();