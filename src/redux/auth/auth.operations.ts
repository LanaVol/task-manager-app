import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import { AxiosError } from "axios";

export class AuthOperations {
  static singin = createAsyncThunk(
    "auth/singin",
    async ({ email, password }: any, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.login({ email, password });
        console.log("data", data);
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );
  static singup = createAsyncThunk(
    "auth/singup",
    async ({ userName, email, password }: any, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.register({
          userName,
          email,
          password,
        });
        console.log("data", data);
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );
  static refresh = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.refresh();
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );
}
