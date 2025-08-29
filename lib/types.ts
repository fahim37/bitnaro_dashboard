export interface User {
  _id: string
  name: string
  email: string
  phone?: string
  totalCompletedOrder: number
  completedBookings: any[]
}

export interface Provider {
  _id: string
  name: string
  email: string
  serviceCount: number
}

export interface CommissionReport {
  _id: string
  name: string
  email: string
  phone?: string
  completedOrder: number
  totalPayment: number
  adminProfit: number
}

export interface Statistics {
  totalUser: number
  totalProvider: number
  totalOrder: number
  totalAdminEarning: number
}

export interface RecentActivity {
  _id: string
  userId: {
    _id: string
    name: string
  }
  serviceId: {
    _id: string
    serviceDetails: Array<{
      title: string
    }>
  }
  totalPrice: number
  status: string
  createdAt: string
  providerId: {
    _id: string
    name: string
  }
}

export interface TopService {
  _id: string
  totalBookings: number
  title: string[]
  percentage: number
}

export interface PaginationInfo {
  page: number
  limit: number
  totalPages: number
  totalItems: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  pagination?: PaginationInfo
}
