'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'

type Props = {
  multiple?: boolean
  maxFiles?: number
  onChange?: (files: File[]) => void
  onRemoveExisting?: () => void
  initialUrl?: string
  label?: string
  error?: string
}

export default function UploadInput({
  multiple = true,
  maxFiles = 5,
  onChange,
  onRemoveExisting,
  initialUrl,
  label,
  error,
}: Props) {
  const [existingUrl, setExistingUrl] = useState<string | null>(
    initialUrl ?? null
  )
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback(
    (incoming: File[]) => {
      setFiles((cur) => {
        const merged = [...cur, ...incoming].slice(0, maxFiles)
        setPreviews(merged.map((f) => URL.createObjectURL(f)))
        onChange?.(merged)
        return merged
      })
    },
    [maxFiles, onChange]
  )

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index])
    setFiles((cur) => {
      const updated = cur.filter((_, i) => i !== index)
      setPreviews(updated.map((f) => URL.createObjectURL(f)))
      onChange?.(updated)
      return updated
    })
  }

  const removeExisting = () => {
    setExistingUrl(null)
    onRemoveExisting?.()
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    addFiles(Array.from(e.dataTransfer.files))
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

            {(existingUrl || files.length > 0) && (
              <div className="flex flex-wrap justify-center gap-3">
                {existingUrl && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative size-20 overflow-hidden rounded-xl">
                      <Image
                        src={existingUrl}
                        alt="Текущее фото"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeExisting}
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
                      Текущее фото
                    </span>
                  </div>
                )}

                {files.map((file, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="relative size-20 overflow-hidden rounded-xl">
                      <Image
                        src={previews[i]}
                        alt={file.name}
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
                      {file.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="text-secondary text-[24px]">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-main underline"
              >
                Добавьте
              </button>{' '}
              или перетащите файл
              {files.length > 0 && (
                <span className="text-secondary ml-2 text-sm">
                  {files.length} из {maxFiles}
                </span>
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
