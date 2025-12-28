"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { ProfileAvatar } from "./ProfileAvatar";
import { Button } from "./ui/button";

export function AuthNav() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    return <ProfileAvatar />;
  }

  return (
    <Button asChild variant="secondary">
      <Link href="/auth/login">Sign In</Link>
    </Button>
  );
}
