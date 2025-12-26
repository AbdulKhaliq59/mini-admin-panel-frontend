"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TokenService } from "../../utils/token";

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = TokenService.getToken();
    setToken(t);
    if (!t) router.replace("/auth/login");
  }, [router]);

  const logout = () => {
    TokenService.clear();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen p-8 bg-sky-50 dark:bg-sky-900">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-sky-900 dark:text-sky-100">Dashboard</h1>
          <button onClick={logout} className="rounded bg-rose-600 px-3 py-1 text-white">Sign out</button>
        </header>

        <section className="bg-white p-6 rounded shadow dark:bg-sky-800">
          <h2 className="text-lg font-medium text-sky-900 dark:text-sky-100 mb-2">Welcome</h2>
          <p className="text-sm text-sky-700 dark:text-sky-200">This is a simple dashboard placeholder.</p>

          <div className="mt-4">
            <div className="text-xs text-sky-600">Access token (partial):</div>
            <pre className="mt-2 rounded bg-sky-100 p-2 text-sm text-sky-900 dark:bg-sky-900">{token ? `${token.slice(0, 8)}…${token.slice(-8)}` : "(no token)"}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}
