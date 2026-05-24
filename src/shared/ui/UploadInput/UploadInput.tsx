'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { getUploadUrl, uploadFile } from '@/shared/api/files'

type Props = {
  multiple?: boolean
  maxFiles?: number
  onChange?: (urls: string[]) => void
  onRemoveExisting?: (url: string) => Promise<void> | void
  initialUrls?: string[]
  label?: string
  error?: string
  folder: 'profile' | 'catalog'
}

export default function UploadInput({
  multiple = true,
  maxFiles = 5,
  onChange,
  onRemoveExisting,
  initialUrls = [],
  label,
  error,
  folder,
}: Props) {
  const [existingUrls, setExistingUrls] = useState<string[]>(initialUrls)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const updateChange = useCallback(
    (existing: string[], uploaded: string[]) => {
      const merged = [...existing, ...uploaded].slice(0, maxFiles)
      setTimeout(() => onChange?.(merged), 0)
    },
    [maxFiles, onChange]
  )

  const addFiles = useCallback(
    async (incoming: File[]) => {
      setUploading(true)
      try {
        const newUrls: string[] = []

        for (const file of incoming) {
          try {
            const { uploadUrl, publicUrl } = await getUploadUrl(file.name, folder)
            await uploadFile(uploadUrl, file)
            newUrls.push(publicUrl)
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки'
            console.error(`Ошибка загрузки файла ${file.name}:`, error)
            toast.error(`Ошибка загрузки ${file.name}: ${errorMessage}`)
          }
        }

        if (newUrls.length > 0) {
          setUploadedUrls((cur) => {
            const merged = [...cur, ...newUrls]
            updateChange(existingUrls, merged)
            return merged
          })
        }
      } finally {
        setUploading(false)
      }
    },
    [folder, existingUrls, updateChange]
  )

  const removeFile = (index: number) => {
    setUploadedUrls((cur) => {
      const updated = cur.filter((_, i) => i !== index)
      updateChange(existingUrls, updated)
      return updated
    })
  }

  const removeExistingUrl = (index: number) => {
    const urlToRemove = existingUrls[index]
    toast(
      <div className="flex flex-col gap-3">
        <div className="text-[16px] font-semibold">Удалить фото?</div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                if (onRemoveExisting) {
                  await onRemoveExisting(urlToRemove)
                }
                setExistingUrls((cur) => {
                  const updated = cur.filter((_, i) => i !== index)
                  updateChange(updated, uploadedUrls)
                  return updated
                })
                toast.dismiss()
              } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Ошибка удаления'
                toast.error(`Ошибка удаления фото: ${errorMessage}`)
              }
            }}
            className="bg-red rounded px-4 py-2 text-[14px] font-semibold text-white hover:bg-red-400 active:bg-red-600"
          >
            Удалить
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray rounded px-4 py-2 text-[14px] transition hover:bg-gray-300"
          >
            Отмена
          </button>
        </div>
      </div>,
      {
        duration: Infinity,
        position: 'top-center',
      }
    )
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (!uploading) {
      addFiles(Array.from(e.dataTransfer.files))
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        {label && (
          <span className="w-full max-w-77.5 text-[32px] font-bold">
            {label}
          </span>
        )}

        <div className="bg-gray h-64.25 w-full rounded-[30px] p-2.5">
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`border-secondary flex h-full w-full flex-col items-center justify-center gap-4 overflow-y-auto rounded-[30px] border border-dashed p-4 transition ${dragging ? 'bg-black/5' : ''}`}
          >
            <input
              ref={inputRef}
              type="file"
              multiple={multiple}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) addFiles(Array.from(e.target.files))
                e.target.value = ''
              }}
              className="hidden"
            />

            {(existingUrls.length > 0 || uploadedUrls.length > 0) && (
              <div className="flex flex-wrap justify-center gap-3">
                {existingUrls.map((url, i) => (
                  <div key={`existing-${i}`} className="flex flex-col items-center gap-1">
                    <div className="relative size-20 overflow-hidden rounded-xl">
                      <Image
                        src={url}
                        alt="Текущее фото"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingUrl(i)}
                        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                      >
                        <svg
                          className="size-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <span className="text-secondary w-20 truncate text-center text-xs">
                      Текущее
                    </span>
                  </div>
                ))}

                {uploadedUrls.map((url, i) => (
                  <div key={`uploaded-${i}`} className="flex flex-col items-center gap-1">
                    <div className="relative size-20 overflow-hidden rounded-xl">
                      <Image
                        src={url}
                        alt={`Фото ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                      >
                        <svg
                          className="size-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <span className="text-secondary w-20 truncate text-center text-xs">
                      Фото {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="text-secondary text-[24px]">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading || existingUrls.length + uploadedUrls.length >= maxFiles}
                className="text-main underline disabled:opacity-50"
              >
                Добавьте
              </button>{' '}
              или перетащите файл
              {(existingUrls.length > 0 || uploadedUrls.length > 0) && (
                <span className="text-secondary ml-2 text-sm">
                  {existingUrls.length + uploadedUrls.length} из {maxFiles}
                </span>
              )}
              {uploading && (
                <span className="text-secondary ml-2 text-sm">Загрузка...</span>
              )}
            </p>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red mt-1 text-[25px]">
          {Array.isArray(error) ? error.join(', ') : error}
        </p>
      )}
    </div>
  )
}
