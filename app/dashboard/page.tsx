"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { TopServices } from "@/components/dashboard/top-services";
import type {
  Statistics,
  RecentActivity as RecentActivityType,
  TopService,
} from "@/lib/types";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: () =>
      adminApi.getStatistics().then((res) => res.data.data as Statistics),
  });

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: () =>
      adminApi
        .getRecentActivity(7)
        .then((res) => res.data.data as RecentActivityType[]),
  });

  const { data: topServices, isLoading: servicesLoading } = useQuery({
    queryKey: ["top-services"],
    queryFn: () =>
      adminApi
        .getTopServices("7days")
        .then((res) => res.data.data as TopService[]),
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUser || 0}
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Service Providers"
          value={stats?.totalProvider || 0}
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrder || 0}
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Earnings"
          value={`$ ${stats?.totalAdminEarning || 0}`}
          isLoading={statsLoading}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart isLoading={false} />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity data={recentActivity} isLoading={activityLoading} />
        </div>
        <div>
          <TopServices data={topServices} isLoading={servicesLoading} />
        </div>
      </div>
    </div>
  );
}
