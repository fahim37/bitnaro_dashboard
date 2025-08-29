"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { adminApi } from "@/lib/api"
import { UserTable } from "@/components/dashboard/user-table"
import { Pagination } from "@/components/dashboard/pagination"
import type { User, ApiResponse } from "@/lib/types"

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => adminApi.getUsers(currentPage, limit).then((res) => res.data as ApiResponse<User[]>),
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading users. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User List</h1>
        <div className="text-sm text-gray-500">
          {data?.pagination && (
            <>
              Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, data.pagination.totalItems)} of{" "}
              {data.pagination.totalItems} users
            </>
          )}
        </div>
      </div>

      <UserTable users={data?.data} isLoading={isLoading} />

      {data?.pagination && data.pagination.totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={data.pagination.totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  )
}
