import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albums: [],
  loading: false,
  error: null,
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    addAlbum: (state, action) => {
      // check again this logic is not working
      const isDuplicate = state.albums.some(
        (album) => album.imageData.fileName === action.payload.imageData.fileName
      );
    
      if (!isDuplicate) {
        console.log(action.payload, "action.payload---------");
        
        state.albums.push(action.payload);
        state.error = null;
      }else{
         state.error = "Duplicate Image";
      }
    }

    
    // removeAlbum: (state, action) => {
    //   state.albums = state.albums.filter(album => album.id !== action.payload.id);
    // },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
  },
});

export const { addAlbum } = albumSlice.actions;
export default albumSlice.reducer;
