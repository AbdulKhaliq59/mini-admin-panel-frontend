"use client";

import { Button } from "@/components/ui/button";


const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

export default function LoginPage() {
  const openGoogle = () => {
    const authUrl = `${BACKEND.replace(/\/$/, "")}/auth/google`;
    try {
      window.location.href = authUrl;
    } catch (e) {
      const w = window.open(authUrl, "_blank", "width=500,height=600");
      if (!w) alert("Please allow popups for this site to sign in.");
      else w.focus();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="rounded-lg bg-white p-8 shadow-md dark:bg-zinc-900">
        <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Sign in</h2>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">Use your Google account to sign in.</p>
        <div className="flex gap-3">
          <Button onClick={openGoogle}>Sign in with Google</Button>
        </div>
      </div>
    </div>
  );
}
