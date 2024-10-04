import { createSlice } from "@reduxjs/toolkit";

// Initial state for memories
const initialState = {
  memories: [],
  loading: false,
  error: null,
};

const memoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {
    // Add a new memory
    addMemory: (state, action) => {
      state.memories.push(action.payload);
    },
    // Edit an existing memory
    editMemory: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.memories.findIndex((memory) => memory.id === id);
      if (index !== -1) {
        state.memories[index] = { ...state.memories[index], ...updatedData };
      }
    },
    // Delete a memory by id
    deleteMemory: (state, action) => {
      state.memories = state.memories.filter((memory) => memory.id !== action.payload);
    },
    // Loading and error handling (optional, useful for async actions)
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addMemory, editMemory, deleteMemory, setLoading, setError } = memoriesSlice.actions;

export default memoriesSlice.reducer;
