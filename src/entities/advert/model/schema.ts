import { z } from 'zod'

export const advertSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  image: z.string(),
  price: z.number().min(0),
})

export const advertPhotosSchema = z.array(
  z.object({
    id: z.number(),
    img: z.string(),
  })
)

export const availabilitySlotSchema = z.object({
  dateDto: z
    .object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
    })
    .optional(),
  version: z.number(),
  price: z.number(),
  reservedAt: z.string().optional(),
  isAvailable: z.boolean(),
  isReversible: z.boolean(),
  bookingId: z.string().optional(),
})

export const advertDetailsSchema = z.object({
  id: z.string(),
  version: z.number(),
  titleSlug: z.string(),
  categorySlug: z.string(),
  title: z.string(),
  description: z.string(),
  imagesUrls: z.array(z.string()),
  city: z.string(),
  defaultPrice: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isActive: z.boolean(),
  ownerId: z.string(),
  ownerRating: z.number(),
  ownerName: z.string(),
  ownerPhone: z.string(),
  ownerSocialsUrls: z.array(z.string()),
  availabilitySlots: z.array(availabilitySlotSchema),
})

export const advertItemSchema = z.object({
  listingId: z.string(),
  title: z.string(),
  titleSlug: z.string(),
  imageUrl: z.string().optional(),
  pricePerDay: z.number(),
  ownerRating: z.number().optional(),
})

export const advertsResponseSchema = z.object({
  items: z.array(advertItemSchema),
  totalCount: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  city: z.string().optional(),
})

export const userAdvertsResponseSchema = z.object({
  items: z.array(advertItemSchema),
})

export interface AdvertsQueryParams {
  searchTerm?: string
  city?: string
  categorySlug?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  'startDate.year'?: number
  'startDate.month'?: number
  'startDate.day'?: number
  'endDate.year'?: number
  'endDate.month'?: number
  'endDate.day'?: number
  pageNumber?: number
  pageSize?: number
}

const dateSchema = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(),
})

export const createOrderPayloadSchema = z.object({
  listingId: z.string(),
  ownerId: z.string(),
  startDate: dateSchema,
  endDate: dateSchema,
  expectedPrice: z.number(),
})

export const orderResponseSchema = z.object({
  bookingId: z.string(),
  hasBookingId: z.boolean().optional(),
  cancellationReason: z.string().optional(),
  hasCancellationReason: z.boolean().optional(),
})

export type Advert = z.infer<typeof advertSchema>
export type AdvertPhotos = z.infer<typeof advertPhotosSchema>
export type AvailabilitySlot = z.infer<typeof availabilitySlotSchema>
export type AdvertDetails = z.infer<typeof advertDetailsSchema>
export type AdvertItem = z.infer<typeof advertItemSchema>
export type AdvertsResponse = z.infer<typeof advertsResponseSchema>
export type UserAdvertsResponse = z.infer<typeof userAdvertsResponseSchema>
export type CreateOrderPayload = z.infer<typeof createOrderPayloadSchema>
export type OrderResponse = z.infer<typeof orderResponseSchema>
