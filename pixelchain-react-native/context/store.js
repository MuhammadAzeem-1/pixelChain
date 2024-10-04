import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./Services/photosSlice";
import memoriesReducer from "./Services/memoriesSlice";

const store = configureStore({
  reducer: {
    album: albumReducer,
    memories: memoriesReducer,
  },
  // memories: memoriesReducer
});

export default store;
