export interface DateDto {
  year: number
  month: number
  day: number
}

export interface TimestampDto {
  seconds: number
  nanos: number
}

export interface Order {
  id: string
  listingId: string
  tenantId: string
  ownerId: string
  startDate: DateDto
  endDate: DateDto
  totalPrice: number
  createdAt: TimestampDto
  updatedAt: TimestampDto
  version: number
  status: string
  expiresAt: TimestampDto
  cancellationReason: string
  hasCancellationReason: boolean
}

export interface OrdersResponse {
  bookings: Order[]
}

export interface OrderActionResponse {
  success: boolean
  cancellationReason: string
  hasCancellationReason: boolean
}
