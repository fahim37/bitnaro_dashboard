"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { ChangePasswordForm } from "@/components/dashboard/change-password-form";
import { useSession } from "next-auth/react";

type TabType = "personal" | "password";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const { data: session } = useSession();

  const fetchProfile = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch profile");
    const result = await res.json();
    return result.data;
  };

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!session?.accessToken, // only fetch when token available
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Setting</h1>
        <nav className="flex items-center gap-1 text-sm text-gray-500 mt-2">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Setting</span>
        </nav>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4">
        <Button
          variant={activeTab === "personal" ? "default" : "outline"}
          onClick={() => setActiveTab("personal")}
          className={`px-8 py-2 ${
            activeTab === "personal"
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "border-blue-200 text-blue-600 hover:bg-blue-50"
          }`}
        >
          Personal Information
        </Button>
        <Button
          variant={activeTab === "password" ? "default" : "outline"}
          onClick={() => setActiveTab("password")}
          className={`px-8 py-2 ${
            activeTab === "password"
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "border-blue-200 text-blue-600 hover:bg-blue-50"
          }`}
        >
          Change Password
        </Button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "personal" &&
          (isLoading ? (
            <p>Loading profile...</p>
          ) : (
            <ProfileForm initialData={profileData} />
          ))}
        {activeTab === "password" && <ChangePasswordForm />}
      </div>
    </div>
  );
}
