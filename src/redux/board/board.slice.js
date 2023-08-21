import { createSlice } from "@reduxjs/toolkit";
import { fetchBoards, addNewBoard } from "./board.operations";

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
  },
});

export const { actions: boardActions } = boardsSlice;
export const { reducer: boardReducer } = boardsSlice;
