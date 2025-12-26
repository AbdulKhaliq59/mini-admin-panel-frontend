"use client";
import { useEffect } from "react";
import { TokenService } from "../utils/token";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/features/authSlice";

export default function OAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function isOAuthSuccessEvent(e: MessageEvent): boolean {
      if (!e?.data) return false;
      if (e.data.type !== "oauth:success") return false;
      if (!e.data.access_token) return false;
      return true;
    }

    function handler(e: MessageEvent) {
      if (isOAuthSuccessEvent(e)) {
        const token = e.data.access_token as string;
        TokenService.setToken(token, true);
        dispatch(setCredentials({ token }));
        window.location.reload();
      }
    }
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [dispatch]);

  return null;
}
