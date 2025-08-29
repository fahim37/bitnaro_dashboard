"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import type { Provider } from "@/lib/types"

interface ProviderTableProps {
  providers?: Provider[]
  isLoading?: boolean
}

export function ProviderTable({ providers, isLoading }: ProviderTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <div className="text-sm font-medium text-gray-600">Provider ID</div>
          <div className="text-sm font-medium text-gray-600">Provider Name</div>
          <div className="text-sm font-medium text-gray-600">Email</div>
          <div className="text-sm font-medium text-gray-600">Phone Number</div>
          <div className="text-sm font-medium text-gray-600">Services Offered</div>
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
        <div className="text-sm font-medium text-gray-600">Provider ID</div>
        <div className="text-sm font-medium text-gray-600">Provider Name</div>
        <div className="text-sm font-medium text-gray-600">Email</div>
        <div className="text-sm font-medium text-gray-600">Phone Number</div>
        <div className="text-sm font-medium text-gray-600">Services Offered</div>
      </div>

      {/* Data Rows */}
      {providers?.map((provider) => (
        <div
          key={provider._id}
          className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
        >
          <div className="text-sm text-gray-900">{provider._id.slice(-6)}</div>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-100 text-blue-800">
                {provider.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-900">{provider.name}</span>
          </div>
          <div className="text-sm text-gray-900">{provider.email}</div>
          <div className="text-sm text-gray-900">N/A</div>
          <div className="text-sm text-gray-900">{provider.serviceCount}</div>
        </div>
      ))}

      {providers?.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No providers found</p>
        </div>
      )}
    </div>
  )
}
