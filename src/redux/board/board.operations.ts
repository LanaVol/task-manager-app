import { createAsyncThunk } from "@reduxjs/toolkit";
import TaskService from "../../services/TaskService";
import { AxiosError } from "axios";

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_: any, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.getBoards();
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        err.message || "An error occurred with the network"
      );
    }
  }
);

export const addNewBoard = createAsyncThunk(
  "boards/addNewBoard",
  async (newBoard: any, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.addBoard(newBoard);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        err.message || "An error occurred with the network"
      );
    }
  }
);

export const removeBoard = createAsyncThunk(
  "boards/removeBoard",
  async (boardId: any, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.deleteBoard(boardId);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        err.message || "An error occurred with the network"
      );
    }
  }
);

export const updateBoardTitle = createAsyncThunk(
  "boards/updateBoardTitle",
  async ({ boardId, board }: any, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.updateBoard({
        boardId,
        board,
      });
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        err.message || "An error occurred with the network"
      );
    }
  }
);

export const addNewCard = createAsyncThunk(
  "boards/addNewCard",
  async ({ boardId, board }: any, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.updateBoard({
        boardId,
        board,
      });
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        err.message || "An error occurred with the network"
      );
    }
  }
);

export const removeCard = createAsyncThunk(
  "boards/removeCard",
  async ({ boardId, board }: any, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.updateBoard({
        boardId,
        board,
      });
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        err.message || "An error occurred with the network"
      );
    }
  }
);

export const updateCard = createAsyncThunk(
  "boards/updateCard",
  async ({ boardId, board }: any, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.updateBoard({
        boardId,
        board,
      });
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(
        err.message || "An error occurred with the network"
      );
    }
  }
);
