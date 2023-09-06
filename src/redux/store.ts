import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistReducer } from "redux-persist";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { boardReducer } from "./board/board.slice";
import { IAuthState, authReducer } from "./auth/auth.slice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "isLogged", "user"],
};

export interface RootState {
  auth: IAuthState;
}

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    auth: persistReducer<IAuthState>(persistAuthConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
