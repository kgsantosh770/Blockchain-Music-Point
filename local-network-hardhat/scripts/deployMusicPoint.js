const main = async() => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    
    console.log("Deployer of contract: ",deployer.address);
    console.log("Deployer account Balance: ",accountBalance);

    const musicContractFactory = await hre.ethers.getContractFactory("MusicPoint");
    const musicContract = await musicContractFactory.deploy();
    await musicContract.deployed();

    console.log("Music point contract address: ",musicContract.address);
}

const runMain = async() => {
    try{
        await main();
        process.exit(0);
    } catch(error) {
        console.log("Error occured while deploying contract");
        console.log(error);
        process.exit(1);
    }
}

runMain();