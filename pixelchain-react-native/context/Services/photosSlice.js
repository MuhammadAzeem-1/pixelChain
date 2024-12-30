import { createSlice } from "@reduxjs/toolkit";
import {
  createFolder,
  fetchData,
  uploadFileToS3,
} from "../../lib/albumsThunks";

const initialState = {
  albums: [],
  images: [],
  files: [],
  folders: [],
  loading: false,
  error: null,
  uploadComplete: false,
  currentFolder: null,
  nextToken: null, // Pagination token
  hasMore: false, // Flag to indicate if more data is available
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    updateCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },

    clearImages(state) {
      state.images = []; // Clear the images array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.uploadComplete = false;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { Contents, NextContinuationToken } = action.payload;

        const contents = Contents || [];

        contents.forEach((item) => {
          const { Key } = item;

          

          if (
            Key.endsWith(".png") ||
            Key.endsWith(".jpg") ||
            Key.endsWith(".jpeg")
          ) {
            state.images.push({
              imageName: Key.split("/").pop(),
              imageUrl: item.url,
              modifiedDate: item.LastModified,
              size: item.Size,
            });
          } else if (Key.endsWith(".pdf") || Key.endsWith(".docx")) {
            state.files.push({ Key });
          } else {
             state.folders.push({ Key });

       
          }
        });

        state.nextToken = NextContinuationToken;
        state.hasMore = !!NextContinuationToken;
        state.loading = false;
        state.uploadComplete = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Handle uploading files
      .addCase(uploadFileToS3.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFileToS3.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadComplete = true;

        const uploadedFile = action.payload;
        const { Key, FileSize, Location, PreSignedUrl, UploadDate } =
          uploadedFile;
        if (
          Key.endsWith(".png") ||
          Key.endsWith(".jpg") ||
          Key.endsWith(".jpeg")
        ) {
          state.images.push({
            imageName: Key.split("/").pop(),
            imageUrl: PreSignedUrl,
            modifiedDate: UploadDate,
            size: FileSize,
          });
        } else if (Key.endsWith(".pdf") || Key.endsWith(".docx")) {          
          state.files.push(uploadedFile);
        } else {          
          state.folders.push(uploadedFile);
        }
      })
      .addCase(uploadFileToS3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createFolder
      .addCase(createFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.loading = false;

        state.folders.push({ Key: action.payload.Key });
        state.uploadComplete = true;
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateCurrentFolder, clearImages } = albumSlice.actions;

export default albumSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import RNFS from "react-native-fs";
// import AWS from "aws-sdk";

// // Function to configure S3
// function configureS3({ accessKeyId, secretAccessKey, endpoint }) {
//   AWS.config.update({
//     accessKeyId,
//     secretAccessKey,
//     region: "us-east-1", // Can be adjusted or omitted
//   });

//   return new AWS.S3({
//     endpoint,
//     s3ForcePathStyle: true, // Required for S3-compatible services like Storj
//     signatureVersion: "v4",
//   });
// }

// // Async thunk to fetch images on app load
// export const fetchData = createAsyncThunk(
//   "albums/fetchData",
//   async (_, { rejectWithValue }) => {
//     try {
//       const bucketName = "pixelchain-app";
//       const accessKeyId = "";
//       const secretAccessKey =
//         "";
//       const endpoint = "https://gateway.storjshare.io";

//       const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });

//       const response = await s3.listObjectsV2({ Bucket: bucketName }).promise();

//       // Generate pre-signed URLs for each item in the contents
//       const itemsWithUrls = response.Contents.map((item) => ({
//         ...item,
//         url: s3.getSignedUrl("getObject", {
//           Bucket: bucketName,
//           Key: item.Key,
//           Expires: 60 * 60, // URL valid for 1 hour
//         }),
//       }));

//       return { Contents: itemsWithUrls };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Function to upload file to S3 bucket
// export const uploadFileToS3 = createAsyncThunk(
//   "albums/uploadFile",
//   async ({ fileUri, fileName }, { rejectWithValue }) => {
//     console.log("uploadFileToS3", fileName);
//     console.log("fileYRI", fileUri);

//     try {
//       // Helper function to get MIME type based on the file extension
//       function getMimeType(fileName) {
//         const extension = fileName.split(".").pop();
//         switch (extension) {
//           case "jpg":
//           case "jpeg":
//             return "image/jpeg";
//           case "png":
//             return "image/png";
//           case "pdf":
//             return "application/pdf";
//           case "docx":
//             return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
//           default:
//             return "application/octet-stream"; // Default MIME type if unknown
//         }
//       }

//       const bucketName = "pixelchain-app";
//       const accessKeyId = "";
//       const secretAccessKey =
//         "";
//       const endpoint = "https://gateway.storjshare.io";

//       const s3 = configureS3({ accessKeyId, secretAccessKey, endpoint });

//       // Read file content from URI
//       const fileContent = await RNFS.readFile(fileUri, "base64")

//       // Create params for upload
//       const params = {
//         Bucket: bucketName,
//         Key: file.name,
//         Body: {
//           uri: file.uri,
//           type: file.type,
//           name: file.name,
//         },
//         ContentType: file.type,
//       };

//       //Upload file to S3
//       const response = await s3.upload(params).promise();
//       console.log("File uploaded to S3:", response);

//       return response; // Return the file URL
//     } catch (error) {
//       console.error("Error uploading file to S3:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   albums: [],
//   images: [],
//   files: [],
//   folders: [],
//   loading: false,
//   error: null,
//   uploadComplete: false,
// };

// const albumSlice = createSlice({
//   name: "albums",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // Handle fetching images when app loads
//     builder.addCase(fetchData.pending, (state) => {
//       state.loading = true;
//       state.uploadComplete = false;
//       state.error = null;
//     });
//     builder.addCase(fetchData.fulfilled, (state, action) => {
//       const contents = action.payload.Contents || [];

//       // Clear arrays to prevent duplicates
//       state.images = [];
//       state.files = [];
//       state.folders = [];

//       // Separate contents based on file type and add to the respective state arrays
//       contents.forEach((item) => {
//         const { Key } = item;

//         if (
//           Key.endsWith(".png") ||
//           Key.endsWith(".jpg") ||
//           Key.endsWith(".jpeg")
//         ) {
//           state.images.push(item);
//         } else if (Key.endsWith(".pdf") || Key.endsWith(".docx")) {
//           state.files.push(item);
//         } else {
//           state.folders.push(item);
//         }
//       });

//       state.loading = false;
//       state.uploadComplete = true;
//     });
//     builder.addCase(fetchData.rejected, (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     });

//     // Handle uploading files
//     builder.addCase(uploadFileToS3.pending, (state) => {
//       state.loading = true; // Set loading to true when upload starts
//       state.error = null;
//     });
//     builder.addCase(uploadFileToS3.fulfilled, (state, action) => {
//       state.loading = false; // Set loading to false on success
//       state.uploadComplete = true; // Indicate upload is complete

//       // Optionally, add the uploaded file to the corresponding state array
//       const uploadedFile = action.payload;
//       const { Key } = uploadedFile;

//       if (
//         Key.endsWith(".png") ||
//         Key.endsWith(".jpg") ||
//         Key.endsWith(".jpeg")
//       ) {
//         state.images.push(uploadedFile);
//       } else if (Key.endsWith(".pdf") || Key.endsWith(".docx")) {
//         state.files.push(uploadedFile);
//       } else {
//         state.folders.push(uploadedFile);
//       }
//     });
//     builder.addCase(uploadFileToS3.rejected, (state, action) => {
//       state.loading = false; // Stop loading on failure
//       state.error = action.payload; // Store the error message
//     });
//   },
// });

// export const { addAlbum } = albumSlice.actions;
// export default albumSlice.reducer;
