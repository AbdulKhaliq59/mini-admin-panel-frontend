"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TokenService } from "../../../utils/token";
import { useAppDispatch } from "../../../store/hooks";
import { setToken } from "../../../store/features/authSlice";
import { Spinner } from "../../../components/ui/spinner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthSuccess() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const qs = new URLSearchParams(hash.replace(/^#/, ""));
    const token = qs.get("access_token");

    if (token) {
      TokenService.setToken(token, true);
      dispatch(setToken(token));

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
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Spinner className="h-5 w-5" />
            Signing you in
          </CardTitle>
          <CardDescription>
            Completing authentication — you will be redirected shortly.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
