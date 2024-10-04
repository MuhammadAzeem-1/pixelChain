const express = require("express");
const { uploadImageToStorj, getImagesFromStorj } = require("../controllers/imagesController");
const multer = require('multer');
const router = express.Router();

// Set up multer for file handling (memory storage for simplicity)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// multer middleware for file handling
router.route("/image/uploadImage").post(upload.single('image'), uploadImageToStorj);

router.route("/image/getImages/:publicKey").get(getImagesFromStorj);


module.exports = router;