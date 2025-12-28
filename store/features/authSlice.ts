import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthStatus, AuthState } from "../../types/auth";

const initialState: AuthState = {
  accessToken: null,
  user: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ accessToken: string; user: User }>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = "authenticated";
    },
    setToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.status = "loading";
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    logout(state) {
      state.accessToken = null;
      state.user = null;
      state.status = "unauthenticated";
    },
  },
});

export const { setCredentials, setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export type { User, AuthStatus };
