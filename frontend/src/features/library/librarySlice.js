import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import libraryService from "./libraryService";

const library = JSON.parse(localStorage.getItem("library"));

const initialState = {
  animeList: library ? library : null,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  addIsSuccess: false,
  addIsError: false,
  deleteIsSuccess: false,
  deleteIsError: false,
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

export const deleteAnime = createAsyncThunk(
  "library/deleteAnime",
  async (data, thunkAPI) => {
    try {
      return await libraryService.removeAnime(data);
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

export const clear = createAsyncThunk("library/clear", async () => {
  await libraryService.clear();
});

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    reset: (state) => {
      state.total = 0;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.addIsSuccess = false;
      state.addIsError = false;
      state.deleteIsSuccess = false;
      state.deleteIsError = false;
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
        state.total = action.payload.length;
      })
      .addCase(getLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.animeList = null;
      })
      .addCase(addAnime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnime.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addIsSuccess = true;
        state.animeList = action.payload;
        state.total = action.payload.length;
      })
      .addCase(addAnime.rejected, (state, action) => {
        state.isLoading = false;
        state.addIsError = true;
        state.message = action.payload;
      })
      .addCase(deleteAnime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnime.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleteIsSuccess = true;
        state.animeList = action.payload;
        state.total = action.payload.length;
      })
      .addCase(deleteAnime.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteIsError = true;
        state.message = action.payload;
      })
      .addCase(clear.fulfilled, (state) => {
        state.animeList = null;
        state.isSuccess = true;
        state.total = 0;
      });
  },
});

export default librarySlice.reducer;
export const { reset } = librarySlice.actions;
