import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import { AxiosError } from "axios";

export const fetchAuthUser = createAsyncThunk("", async () => {});
