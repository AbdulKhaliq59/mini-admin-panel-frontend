import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["api/executeQuery/fulfilled"],
        ignoredPaths: ["api.queries.exportUsersProtobuf(undefined).data"],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
