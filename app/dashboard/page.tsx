"use client";

import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useAuth } from "../../hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8 bg-background">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user?.fullName}</CardTitle>
              <CardDescription>You are signed in as {user?.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is your protected dashboard. Only authenticated users can access this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}