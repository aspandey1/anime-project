import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import libraryService from "./libraryService";

const library = JSON.parse(localStorage.getItem("library"));

const initialState = {
  animeList: library ? library : null,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getLibrary = createAsyncThunk(
  "library/get",
  async (data, thunkAPI) => {
    try {
      return await libraryService.get(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addAnime = createAsyncThunk(
  "library/add",
  async (data, thunkAPI) => {
    try {
      return await libraryService.add(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLibrary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.animeList = action.payload;
      })
      .addCase(getLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.animeList = null;
      });
  },
});

export default librarySlice.reducer;
export const { reset } = librarySlice.actions;
