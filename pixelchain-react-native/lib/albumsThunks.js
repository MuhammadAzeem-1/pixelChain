import { createAsyncThunk } from "@reduxjs/toolkit";
import { configureS3 } from "./s3service";
import { getMimeType } from "./Helper";


// Async thunk to fetch images on app load
export const fetchData = createAsyncThunk(
  "albums/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const bucketName = "pixelchain-app";
      const accessKeyId = "jvwqwn325t55apbfk53efffvnefq"; // Add credentials
      const secretAccessKey = "j2ogq7n56llbexk42e3lf6rsc22stl53srh6kdwxbjho3aes4j53o";
      const endpoint = "https://gateway.storjshare.io";

      const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });
      const response = await s3.listObjectsV2({ Bucket: bucketName }).promise();

      const itemsWithUrls = response.Contents.map((item) => ({
        ...item,
        url: s3.getSignedUrl("getObject", {
          Bucket: bucketName,
          Key: item.Key,
          Expires: 60 * 60, // 1 hour
        }),
      }));

      return { Contents: itemsWithUrls };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to upload file to S3 bucket
export const uploadFileToS3 = createAsyncThunk(
  "albums/uploadFile",
  async ({ fileUri, fileName }, { rejectWithValue }) => {
    try {

      console.log("uploadFileToS3", fileName);
      console.log("fileYRI", fileUri)
      

      const bucketName = "pixelchain-app";
      const accessKeyId = "jvwqwn325t55apbfk53efffvnefq"; // Add credentials
      const secretAccessKey = "j2ogq7n56llbexk42e3lf6rsc22stl53srh6kdwxbjho3aes4j53o";
      const endpoint = "https://gateway.storjshare.io";

      const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });
      
      const fileType = getMimeType(fileName);
     let filepath;
      // const filepath =  await fetch(fileUri).then((response => 
      //   response.blob()
      // ));
      
      const params = {
        Bucket: bucketName,
        Key: fileName,
        ACL: "public-read",
        Body: filepath,
        ContentType: fileType,
      };


      const response = await s3.upload(params).promise();
     console.log(response, "------ response -----");

     const fileSize = filepath.size;
     const uploadDate = new Date().toISOString();

      // Generate a pre-signed URL valid for 7 days (604800 seconds)
      const preSignedUrl = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: fileName,
        Expires: 604800, // 7 days in seconds
      });



      
      return {
        Location: response.Location,
        Key: response.Key,
        Bucket: response.Bucket,
        FileSize: fileSize,
        UploadDate: uploadDate,
        PreSignedUrl: preSignedUrl,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
