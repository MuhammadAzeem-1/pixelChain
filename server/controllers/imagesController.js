const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");

// Storj S3 credentials (replace with actual credentials)
const accessKeyId = "";
const secretAccessKey = "";
const endpoint = "https://gateway..io";

// Enable SDK logging to console
AWS.config.update({ logger: console });

// Create an S3 client for Storj
const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  endpoint: endpoint,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

const getImagesFromStorj = asyncHandler(async (req, res) => {
  
  const publicKey = req.params.publicKey;

  console.log(req, "req.body-----------------");
  

  try {
    // Specify your bucket name here
    const bucketName = "pixelchain";

    // List objects in the bucket
    const listParams = {
      Bucket: bucketName,
      Prefix: `${publicKey}/`,
    };

    const data = await s3.listObjectsV2(listParams).promise();
    // const data = "data";


    if (data.Contents.length === 0) {
      return res.status(404).json({ message: "No images found in the bucket" });
    }

    const files = data.Contents.map((file) => {
      const fileKey = file.Key;

      const url = s3.getSignedUrl("getObject", {
        Bucket: bucketName,
        Key: fileKey,
        Expires: 60 * 60, // URL expiration time in seconds (e.g., 1 hour)
      });

      return {
        key: fileKey, // The file path in the bucket
        url: url, // Public URL for file access
        createdAt: file.LastModified, // File creation timestamp
        size: file.Size, // File size in bytes
      };
    });

    // Return the list of file URLs to the client
    res.json(files);
  } catch (err) {
    console.error("Error fetching images from Storj:", err);
    res.status(500).json({
      message: "Error fetching images from Storj",
      error: err.message,
    });
  }
});

const uploadImageToStorj = asyncHandler(async (req, res) => {
  // Check if file is uploaded

  console.log(req, "req.body-----------------");
  

  const publicKey = req.body.publicKey;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // File details from multer
  const file = req.file;
  const bucketName = "pixelchain"; // Replace with your Storj bucket name
  const key = `${publicKey}/${file.originalname}`; // Create unique filename

  const params = {
    Bucket: bucketName,
    Key: key,
    ACL: "public-read", // This makes the file publicly accessible
    Body: file.buffer, // File content from multer
    ContentType: file.mimetype, // Ensure the file type is sent correctly
  };

  console.log(params, "params-----------------");

  try {
    // Upload the file to Storj via S3
    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data);

    // Return the uploaded file URL or any other relevant info
    return res.status(200).json({
      message: "File uploaded successfully",
      data: data.Location, // The URL of the uploaded file
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    return res.status(500).json({ message: "Error uploading file to Storj" });
  }
});

module.exports = { uploadImageToStorj, getImagesFromStorj };

// const getImagesFromStorj = asyncHandler(async (req, res) => {

//   const publicKey = req.body.publicKey;

//   try {
//     // Specify your bucket name here
//     const bucketName = "pixelchain";

//     // List objects in the bucket
//     const listParams = {
//       Bucket: bucketName,
//       Prefix: `${publicKey}/`
//     };

//     const data = await s3.listObjectsV2(listParams).promise();

//     console.log("Fetched images from Storj:", data);

//     if (data.Contents.length === 0) {
//       return res.status(404).json({ message: "No images found in the bucket" });
//     }

//     // Optionally, filter to only get image files by checking the file extension
//     const imageFiles = data.Contents.filter(
//       (file) =>
//         file.Key.endsWith(".jpg") ||
//         file.Key.endsWith(".jpeg") ||
//         file.Key.endsWith(".png")
//     );

//     if (imageFiles.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No image files found in the bucket" });
//     }

//     // Prepare the list of image URLs
//     const imageUrls = imageFiles.map((file) => {
//       const url = s3.getSignedUrl("getObject", {
//         Bucket: bucketName,
//         Key: file.Key,
//         Expires: 60 * 60, // URL expiration time (e.g., 1 hour)
//       });
//       return { fileName: file.Key, url: url };
//     });

//     res
//       .status(200)
//       .json({ message: "Images fetched successfully", images: imageUrls });
//   } catch (err) {
//     console.error("Error fetching images from Storj:", err);
//     res
//       .status(500)
//       .json({
//         message: "Error fetching images from Storj",
//         error: err.message,
//       });
//   }
// });
