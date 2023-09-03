import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBoards,
  addNewBoard,
  removeBoard,
  updateBoardTitle,
  addNewCard,
  removeCard,
  updateCard,
  onDragEnd,
} from "./board.operations";

const initialState = {
  boards: [],
  isLoading: false,
  error: null,
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = action.payload[0].boards;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addNewBoard.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addNewBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = [...state.boards, action.payload];
    });
    builder.addCase(addNewBoard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(removeBoard.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    });
    builder.addCase(removeBoard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateBoardTitle.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateBoardTitle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload.id) return action.payload;
        return board;
      });
    });
    builder.addCase(updateBoardTitle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addNewCard.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addNewCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload.id) return action.payload;
        return board;
      });
    });
    builder.addCase(addNewCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(removeCard.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload.id) return action.payload;
        return board;
      });
    });
    builder.addCase(removeCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCard.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload.id) return action.payload;
        return board;
      });
    });
    builder.addCase(updateCard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(onDragEnd.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(onDragEnd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = state.boards.map((board) => {
        if (board.id === action.payload.data1.id) return action.payload.data1;
        if (board.id === action.payload.data2.id) return action.payload.data2;
        return board;
      });
    });
    builder.addCase(onDragEnd.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: boardActions } = boardsSlice;
export const { reducer: boardReducer } = boardsSlice;
