import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Task 15: Complete the createAsyncThunk() function
export const fetchSuggestion = createAsyncThunk(
  "suggestion/fetchSuggestion",
  async () => {
    const response = await fetch("http://localhost:3004/api/suggestion");
    if (!response.ok) {
      throw new Error("Failed to fetch suggestion");
    }
    return await response.json();
  }
);

const initialState = {
  suggestion: "",
  loading: false,
  error: true,
};

const options = {
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.suggestion = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSuggestion.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;

export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
