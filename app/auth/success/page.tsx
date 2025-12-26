"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TokenService } from "../../../utils/token";
import { useAppDispatch } from "../../../store/hooks";
import { setCredentials } from "../../../store/features/authSlice";
import { Spinner } from "../../../components/ui/spinner";

export default function AuthSuccess() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const qs = new URLSearchParams(hash.replace(/^#/, ""));
    const token = qs.get("access_token");
    if (token) {
      TokenService.setToken(token, true);
      dispatch(setCredentials({ token }));
      if (window.opener && typeof window.opener.postMessage === "function") {
        window.opener.postMessage({ type: "oauth:success", access_token: token }, window.location.origin);
        window.close();
      } else {
        setTimeout(() => router.push("/dashboard"), 300);
      }
    } else {
      setTimeout(() => router.push("/auth/login"), 300);
    }
  }, [router, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-50 dark:bg-sky-900">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-md dark:bg-sky-800">
        <Spinner className="h-10 w-10 text-sky-600 dark:text-sky-200" />
        <h2 className="text-lg font-medium text-sky-900 dark:text-sky-100">Signing you in…</h2>
        <p className="text-sm text-sky-700 dark:text-sky-200">Completing authentication — you will be redirected shortly.</p>
      </div>
    </div>
  );
}
