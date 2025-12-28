"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Sidebar } from "@/components/Sidebar";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-card">
            <div className="flex justify-end items-center gap-4 p-4 md:p-4">
              <ThemeToggle />
              <ProfileAvatar />
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
