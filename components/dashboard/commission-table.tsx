"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import type { CommissionReport } from "@/lib/types"

interface CommissionTableProps {
  reports?: CommissionReport[]
  isLoading?: boolean
}

export function CommissionTable({ reports, isLoading }: CommissionTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50">
          <div className="text-sm font-medium text-gray-600">User Name</div>
          <div className="text-sm font-medium text-gray-600">Email</div>
          <div className="text-sm font-medium text-gray-600">Phone Number</div>
          <div className="text-sm font-medium text-gray-600">Total Order</div>
          <div className="text-sm font-medium text-gray-600">Amount gain 10%</div>
        </div>

        {/* Loading Rows */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50">
        <div className="text-sm font-medium text-gray-600">User Name</div>
        <div className="text-sm font-medium text-gray-600">Email</div>
        <div className="text-sm font-medium text-gray-600">Phone Number</div>
        <div className="text-sm font-medium text-gray-600">Total Order</div>
        <div className="text-sm font-medium text-gray-600">Amount gain 10%</div>
      </div>

      {/* Data Rows */}
      {reports?.map((report) => (
        <div
          key={report._id}
          className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-yellow-100 text-yellow-800">
                {report.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-900">{report.name}</span>
          </div>
          <div className="text-sm text-gray-900">{report.email}</div>
          <div className="text-sm text-gray-900">{report.phone || "(207) 555-0119"}</div>
          <div className="text-sm text-gray-900">{report.completedOrder}</div>
          <div className="text-sm font-medium text-gray-900">${report.adminProfit}</div>
        </div>
      ))}

      {reports?.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No commission reports found</p>
        </div>
      )}
    </div>
  )
}
