"use client";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-96"></div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              {session?.user?.image ? (
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.email || "User"}
                />
              ) : (
                <AvatarFallback>
                  {session?.user?.email
                    ? session.user.email.charAt(0).toUpperCase()
                    : "A"}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm font-medium text-gray-900">
              {session?.user?.email?.split("@")[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
