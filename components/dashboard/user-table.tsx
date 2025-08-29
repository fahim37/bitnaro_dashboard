"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import type { User } from "@/lib/types"

interface UserTableProps {
  users?: User[]
  isLoading?: boolean
}

export function UserTable({ users, isLoading }: UserTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <div className="text-sm font-medium text-gray-600">User ID</div>
          <div className="text-sm font-medium text-gray-600">User Name</div>
          <div className="text-sm font-medium text-gray-600">Email</div>
          <div className="text-sm font-medium text-gray-600">Phone Number</div>
          <div className="text-sm font-medium text-gray-600">Total Order</div>
        </div>

        {/* Loading Rows */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 last:border-b-0">
            <Skeleton className="h-4 w-16" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50">
        <div className="text-sm font-medium text-gray-600">User ID</div>
        <div className="text-sm font-medium text-gray-600">User Name</div>
        <div className="text-sm font-medium text-gray-600">Email</div>
        <div className="text-sm font-medium text-gray-600">Phone Number</div>
        <div className="text-sm font-medium text-gray-600">Total Order</div>
      </div>

      {/* Data Rows */}
      {users?.map((user) => (
        <div
          key={user._id}
          className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
        >
          <div className="text-sm text-gray-900">{user._id.slice(-6)}</div>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-yellow-100 text-yellow-800">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
          </div>
          <div className="text-sm text-gray-900">{user.email}</div>
          <div className="text-sm text-gray-900">{user.phone || "N/A"}</div>
          <div className="text-sm text-gray-900">{user.totalCompletedOrder}</div>
        </div>
      ))}

      {users?.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No users found</p>
        </div>
      )}
    </div>
  )
}
