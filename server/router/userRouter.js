const express = require("express");
const { userKeysGenrator } = require("../controllers/userController");


const router = express.Router();


// user routes -> authentications with public and private keys
////////////////// ---------------------------------///////////////

router.route("/new/keys").get(userKeysGenrator)

module.exports = router;