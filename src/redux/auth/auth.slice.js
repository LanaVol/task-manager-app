import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthUser } from "./auth.operations";

const initialState = {
  isLogged: false,
  isLoading: false,
  error: null,
};
