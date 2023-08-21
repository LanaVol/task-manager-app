import { configureStore } from "@reduxjs/toolkit";
import { boardReducer } from "./board/board.slice";

export const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
});
