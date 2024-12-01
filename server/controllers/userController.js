const asyncHandler = require("express-async-handler");
const { ethers } = require('ethers');


const userKeysGenrator = asyncHandler(async (req, res) => {
 
    // generate random wallet
    const wallet = ethers.Wallet.createRandom();

    // get private key and public key(address)
    // const privateKey = wallet.privateKey;
    // const publickey = wallet.address;
    const publickey = "0xE6B547A4964FfC42eF171f027Ce059af5bF6772a";
    const privateKey = "0x2ab019921ca9a51930671f864b80345738da5d2320dbe0b2d175edeb4b822586";

    // // response
    res.status(200).json({  publickey, privateKey });
});

module.exports = { userKeysGenrator };
