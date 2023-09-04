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
import storage from "redux-persist/lib/storage";
import { boardReducer } from "./board/board.slice";
import { authReducer } from "./auth/auth.slice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "isLogged", "user"],
};

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    auth: persistReducer(persistAuthConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
