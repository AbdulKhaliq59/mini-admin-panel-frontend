"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setToken, setUser, logout } from "../store/features/authSlice";
import { useGetProfileQuery } from "../store/services/api";
import { TokenService } from "../utils/token";

function useTokenInitialization() {
  const dispatch = useAppDispatch();
  const { accessToken, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = TokenService.getToken();
    if (token && !accessToken) {
      dispatch(setToken(token));
    } else if (!token && status === "loading") {
      dispatch(logout());
    }
  }, []);

  return accessToken;
}

function isUnauthorizedError(error: unknown): boolean {
  return !!error && typeof error === "object" && "status" in error && error.status === 401;
}

function useProfileSync(accessToken: string | null, status: string) {
  const dispatch = useAppDispatch();
  const { data: user, error } = useGetProfileQuery(undefined, {
    skip: !accessToken || status === "authenticated",
  });

  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user, dispatch]);

  useEffect(() => {
    if (isUnauthorizedError(error)) {
      dispatch(logout());
      TokenService.clear();
    }
  }, [error, dispatch]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const status = useAppSelector((state) => state.auth.status);
  const accessToken = useTokenInitialization();
  useProfileSync(accessToken, status);

  return <>{children}</>;
}
