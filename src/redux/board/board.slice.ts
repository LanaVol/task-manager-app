import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
import { BoardItem, IBoardDataResponse } from "../../interfaces/DataTypes";

export interface IBoardState {
  boards: BoardItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IBoardState = {
  boards: [],
  isLoading: false,
  error: null,
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state: IBoardState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchBoards.fulfilled,
      (state: IBoardState, action: PayloadAction<IBoardDataResponse>) => {
        state.isLoading = false;
        state.boards = action.payload[0].boards;
      }
    );
    builder.addCase(
      fetchBoards.rejected,
      (state: IBoardState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(addNewBoard.pending, (state: IBoardState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      addNewBoard.fulfilled,
      (state: IBoardState, action: PayloadAction<BoardItem>) => {
        state.isLoading = false;
        state.boards = [...state.boards, action.payload];
      }
    );
    builder.addCase(
      addNewBoard.rejected,
      (state: IBoardState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(removeBoard.pending, (state: IBoardState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      removeBoard.fulfilled,
      (state: IBoardState, action: PayloadAction<number>) => {
        state.isLoading = false;
        state.boards = state.boards.filter(
          (board) => board.id !== action.payload
        );
      }
    );
    builder.addCase(
      removeBoard.rejected,
      (state: IBoardState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(updateBoardTitle.pending, (state: IBoardState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updateBoardTitle.fulfilled,
      (state: IBoardState, action: PayloadAction<BoardItem>) => {
        state.isLoading = false;
        state.boards = state.boards.map((board) => {
          if (board.id === action.payload.id) return action.payload;
          return board;
        });
      }
    );
    builder.addCase(
      updateBoardTitle.rejected,
      (state: IBoardState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(addNewCard.pending, (state: IBoardState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      addNewCard.fulfilled,
      (state: IBoardState, action: PayloadAction<BoardItem>) => {
        state.isLoading = false;
        state.boards = state.boards.map((board) => {
          if (board.id === action.payload.id) return action.payload;
          return board;
        });
      }
    );
    builder.addCase(
      addNewCard.rejected,
      (state: IBoardState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(removeCard.pending, (state: IBoardState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      removeCard.fulfilled,
      (state: IBoardState, action: PayloadAction<BoardItem>) => {
        state.isLoading = false;
        state.boards = state.boards.map((board) => {
          if (board.id === action.payload.id) return action.payload;
          return board;
        });
      }
    );
    builder.addCase(
      removeCard.rejected,
      (state: IBoardState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(updateCard.pending, (state: IBoardState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updateCard.fulfilled,
      (state: IBoardState, action: PayloadAction<BoardItem>) => {
        state.isLoading = false;
        state.boards = state.boards.map((board) => {
          if (board.id === action.payload.id) return action.payload;
          return board;
        });
      }
    );
    builder.addCase(
      updateCard.rejected,
      (state: IBoardState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(onDragEnd.pending, (state: IBoardState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      onDragEnd.fulfilled,
      (
        state: IBoardState,
        action: PayloadAction<{
          data1: BoardItem;
          data2: BoardItem;
        }>
      ) => {
        state.isLoading = false;
        state.boards = state.boards.map((board) => {
          if (board.id === action.payload.data1.id) return action.payload.data1;
          if (board.id === action.payload.data2.id) return action.payload.data2;
          return board;
        });
      }
    );
    builder.addCase(
      onDragEnd.rejected,
      (state: IBoardState, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { actions: boardActions } = boardsSlice;
export const { reducer: boardReducer } = boardsSlice;
