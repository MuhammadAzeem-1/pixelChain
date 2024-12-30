import { createSlice } from "@reduxjs/toolkit";
import { fetchImagesByFolder } from "../../lib/albumsThunks";

const initialState = {
  FolderImages: [], // To store images from the selected folder
  loading: false,   // Loading state for the fetch request
  error: null,      // Error state for handling errors
};
// asd

const memoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {
    // You can add additional synchronous reducers  if needed
    clearFolderImages(state) {
      state.FolderImages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(fetchImagesByFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fulfilled state
      .addCase(fetchImagesByFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.FolderImages = action.payload.Contents; // Add fetched images to state
      })
      // Handle rejected state
      .addCase(fetchImagesByFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch images.";
      });
  },
});

export const { clearFolderImages } = memoriesSlice.actions;

export default memoriesSlice.reducer;
