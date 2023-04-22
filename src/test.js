const {ethers} = require('ethers');
const wallet = require("./wallet/wallet.json");

const provider = new ethers.providers.JsonRpcBatchProvider("https://eth-sepolia.g.alchemy.com/v2/S9-vZJJHsTkDS0aphkMBPXA7p1qSPq5S");

const walletContract = new ethers.Contract("0xb60b9a34533B9AdB574F580cDaD0715dCCe3290a",wallet.output.abi,provider);

async function getData(){
    const get = await walletContract.filters.recepients();
    const trans = await walletContract.queryFilter(get);
    console.log(trans);
}

getData();