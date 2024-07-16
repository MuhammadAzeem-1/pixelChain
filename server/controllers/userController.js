const asyncHandler = require("express-async-handler");
const { ethers } = require('ethers');


const userKeysGenrator = asyncHandler(async (req, res) => {
 
    // generate random wallet
    const wallet = ethers.Wallet.createRandom();

    // get private key and public key(address)
    const privateKey = wallet.privateKey;
    const publickey = wallet.address;

    // // response
    res.status(200).json({  publickey, privateKey });
});

module.exports = { userKeysGenrator };
