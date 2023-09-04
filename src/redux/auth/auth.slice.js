import { createSlice } from "@reduxjs/toolkit";
import { AuthOperations } from "./auth.operations";

const initialState = {
  isLogged: false,
  isLoading: false,
  accessToken: null,
  error: null,
  refreshAttempts: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    incrementRefreshAttempts: (state) => {
      state.refreshAttempts += 1;
    },
    resetRefreshAttempts: (state) => {
      state.refreshAttempts = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AuthOperations.singin.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(AuthOperations.singin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.singin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetRefreshAttempts } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
