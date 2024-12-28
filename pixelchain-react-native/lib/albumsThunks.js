import { createAsyncThunk } from "@reduxjs/toolkit";
import { configureS3 } from "./s3service";
import { getCredientaisl, getMimeType } from "./Helper";

const data = getCredientaisl();

// Async thunk to fetch images on app load
export const fetchData = createAsyncThunk(
  "albums/fetchData",
  async ({ continuationToken  }, { rejectWithValue }) => {
    try {
      // check agian _j

      const bucketName = data._j.bucketName;
      const accessKeyId = data._j.accessId; // Add credentials
      const secretAccessKey = data._j.secretKey;
      const endpoint = data._j.endpoint;
      

      const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });

      const params = {
        Bucket: bucketName,
        MaxKeys: 9, // Fetch 10 images at a time
        ContinuationToken : continuationToken
      };
      

      const response = await s3.listObjectsV2(params).promise()

      const itemsWithUrls = response.Contents.map((item) => ({
        ...item,
        url: s3.getSignedUrl("getObject", {
          Bucket: bucketName,
          Key: item.Key,
          Expires: 60 * 60, // 1 hour
          
        }),
        LastModified: item.LastModified.toISOString()
      }));

      

      return { Contents: itemsWithUrls , NextContinuationToken: response.NextContinuationToken, };
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
      const bucketName = data._j.bucketName;
      const accessKeyId = data._j.accessId; // Add credentials
      const secretAccessKey = data._j.secretKey;
      const endpoint = data._j.endpoint;

      const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });

      const fileType = getMimeType(fileName);
      // let filepath;
      const filepath = await fetch(fileUri).then((response) => response.blob());

      const params = {
        Bucket: bucketName,
        Key: fileName,
        ACL: "public-read",
        Body: filepath,
        ContentType: fileType,
      };


      const response = await s3.upload(params).promise();

      const fileSize = filepath.size;
      const uploadDate = new Date().toISOString();

      // Generate a pre-signed URL valid for 7 days (604800 seconds)
      const preSignedUrl = s3.getSignedUrl("getObject", {
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
// to create a folder in S3 bucket
export const createFolder = createAsyncThunk(
  "albums/createFolder",
  async ({ folderName }, { rejectWithValue }) => {
    try {
      console.log("folderName", folderName);

      const bucketName = data._j.bucketName;
      const accessKeyId = data._j.accessId; // Add credentials
      const secretAccessKey = data._j.secretKey;
      const endpoint = data._j.endpoint;

      const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });

      // Folder Key should end with a "/" to represent it as a folder in S3
      const folderKey = `${folderName}/`;

      const params = {
        Bucket: bucketName,
        Key: folderKey,
        Body: "", // Empty body for folder creation
      };

      await s3.putObject(params).promise();

      return { Key: folderKey }; // Return the folder key to update state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadToS3WithFolder = createAsyncThunk(
  "albums/uploadFile",
  async ({ fileUri, fileName, folderName }, { rejectWithValue }) => {
    try {
      console.log("uploadFileToS3", fileName);
      console.log("fileURI", fileUri);
      console.log("folderName", folderName);

      const bucketName = data._j.bucketName;
      const accessKeyId = data._j.accessId; // Add credentials
      const secretAccessKey = data._j.secretKey;
      const endpoint = data._j.endpoint;



      const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });

      const fileType = getMimeType(fileName);

      // Fetch the file from the URI as a blob
      const fileBlob = await fetch(fileUri).then((response) => response.blob());

      // Update the Key to include the folder name
      const key = folderName ? `${folderName}/${fileName}` : fileName;

      const params = {
        Bucket: bucketName,
        Key: key, // Include the folder name in the Key
        ACL: "public-read",
        Body: fileBlob,
        ContentType: fileType,
      };

      const response = await s3.upload(params).promise();

      const fileSize = fileBlob.size;
      const uploadDate = new Date().toISOString();

      // Generate a pre-signed URL valid for 7 days (604800 seconds)
      const preSignedUrl = s3.getSignedUrl("getObject", {
        Bucket: bucketName,
        Key: key,
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


// ----------------------

export const fetchImagesByFolder = createAsyncThunk(
  "albums/fetchImagesByFolder",
  async ({ folderName, continuationToken }, { rejectWithValue }) => {
    try {
      const bucketName = data._j.bucketName;
      const accessKeyId = data._j.accessId; // Add credentials
      const secretAccessKey = data._j.secretKey;
      const endpoint = data._j.endpoint;

      const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });

      const params = {
        Bucket: bucketName,
        Prefix: `${folderName}/`, // Specify folder name
        MaxKeys: 9, // Fetch 9 items at a time
        ContinuationToken: continuationToken,
      };

      const response = await s3.listObjectsV2(params).promise();

      const itemsWithUrls = response.Contents.filter(item =>
        item.Key.startsWith(`${folderName}/`) && 
        (item.Key.endsWith(".png") || item.Key.endsWith(".jpg") || item.Key.endsWith(".jpeg"))
      ).map((item) => ({
        ...item,
        url: s3.getSignedUrl("getObject", {
          Bucket: bucketName,
          Key: item.Key,
          Expires: 60 * 60, // 1 hour
        }),
        LastModified: item.LastModified.toISOString(),
      }));

      return {
        Contents: itemsWithUrls,
        NextContinuationToken: response.NextContinuationToken,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);