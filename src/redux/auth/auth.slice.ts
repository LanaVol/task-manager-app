import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthOperations } from "./auth.operations";
import { IAuthDataResponse } from "../../interfaces/DataTypes";

export interface IAuthState {
  isLogged: boolean;
  isLoading: boolean;
  accessToken: string | null;
  error: string | null;
  refreshAttempts: number;
}

const initialState: IAuthState = {
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
    builder.addCase(AuthOperations.singin.pending, (state: IAuthState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      AuthOperations.singin.fulfilled,
      (state: IAuthState, action: PayloadAction<IAuthDataResponse>) => {
        state.isLoading = false;
        state.isLogged = true;
        state.accessToken = action.payload.token;
      }
    );
    builder.addCase(
      AuthOperations.singin.rejected,
      (state: IAuthState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLogged = false;
      }
    );
    builder.addCase(AuthOperations.singup.pending, (state: IAuthState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      AuthOperations.singup.fulfilled,
      (state: IAuthState, action: PayloadAction<IAuthDataResponse>) => {
        state.isLoading = false;
        state.isLogged = true;
        state.accessToken = action.payload.token;
      }
    );
    builder.addCase(
      AuthOperations.singup.rejected,
      (state: IAuthState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLogged = false;
      }
    );
    builder.addCase(AuthOperations.logout.pending, (state: IAuthState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(AuthOperations.logout.fulfilled, (state: IAuthState) => {
      state.isLoading = false;
      state.isLogged = false;
      state.accessToken = null;
    });
    builder.addCase(
      AuthOperations.logout.rejected,
      (state: IAuthState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLogged = false;
        state.accessToken = null;
      }
    );
  },
});

export const { resetRefreshAttempts } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
