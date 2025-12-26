import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  token: string | null;
  status: AuthStatus;
  error?: string | null;
}

const initialState: AuthState = {
  token: null,
  status: "unauthenticated",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.status = "authenticated";
      state.error = null;
    },
    clearCredentials(state) {
      state.token = null;
      state.status = "unauthenticated";
      state.error = null;
    },
    setLoading(state) {
      state.status = "loading";
      state.error = null;
    },
    setError(state, action: PayloadAction<{ error: string }>) {
      state.status = "unauthenticated";
      state.error = action.payload.error;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
