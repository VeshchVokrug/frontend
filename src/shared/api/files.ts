import { apiClient } from './api-client'
import { z } from 'zod'

const uploadUrlResponseSchema = z.object({
  uploadUrl: z.string(),
  publicUrl: z.string(),
})

export type UploadUrlResponse = z.infer<typeof uploadUrlResponseSchema>

export const getUploadUrl = async (
  fileName: string,
  folder: 'profile' | 'catalog'
): Promise<UploadUrlResponse> => {
  const { data } = await apiClient.post<UploadUrlResponse>(
    '/files/upload-url',
    {
      fileName,
      folder,
    }
  )

  const result = uploadUrlResponseSchema.safeParse(data)

  if (!result.success) {
    throw result.error
  }

  return result.data
}

export const uploadFile = async (
  uploadUrl: string,
  file: File
): Promise<void> => {
  const contentType = file.type || 'application/octet-stream'

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': contentType,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('S3 error response:', errorText)
    throw new Error(
      `Ошибка загрузки файла: ${response.status} ${response.statusText}`
    )
  }
}
