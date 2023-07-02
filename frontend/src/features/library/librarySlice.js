import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animeList: [],
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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
});

export default librarySlice.reducer;
