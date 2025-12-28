"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserStatsQuery } from "@/store/services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const calculateTotalUsers = (stats: Array<{ count: number }> | undefined) =>
  stats?.reduce((sum, s) => sum + s.count, 0) || 0;

const calculateAverageDaily = (stats: Array<{ count: number }> | undefined) =>
  stats && stats.length > 0
    ? Math.round(stats.reduce((sum, s) => sum + s.count, 0) / stats.length)
    : 0;

const calculatePeakDay = (stats: Array<{ count: number }> | undefined) =>
  stats && stats.length > 0 ? Math.max(...stats.map(s => s.count)) : 0;

const getTodayCount = (stats: Array<{ count: number }> | undefined) =>
  stats && stats.length > 0 ? stats[stats.length - 1].count : 0;

export default function DashboardHome() {
  const { data: stats, isLoading } = useGetUserStatsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateTotalUsers(stats)}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateAverageDaily(stats)}</div>
            <p className="text-xs text-muted-foreground">Users per day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculatePeakDay(stats)}</div>
            <p className="text-xs text-muted-foreground">Highest registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTodayCount(stats)}</div>
            <p className="text-xs text-muted-foreground">New users today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Registrations - Line Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Registrations - Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
