'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

type Props = {
  name: string
  value: string | number
  onChange?: (value: string) => void
  label: string
  placeholder?: string
  options: {
    value: string
    text: string
  }[]
  error?: string
}

export default function AdvertSelect({
  name,
  value,
  onChange,
  label,
  placeholder,
  options,
  error,
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex">
        <span className="w-full max-w-77.5 text-[32px] font-bold">{label}</span>

        <div ref={ref} className="relative w-full">
          <input type="hidden" name={name} value={value} />

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="bg-gray flex w-full items-center justify-between rounded-[30px] px-9.5 py-3.75"
          >
            <span
              className={`${selected ? 'text-black' : 'text-secondary'} text-left text-[24px]`}
            >
              {selected ? selected.text : placeholder}
            </span>
            <Image
              src="/images/icons/arrow.svg"
              width={10}
              height={20}
              alt="Иконка кнопки открытия выпадающего меню"
              className={`${open ? 'rotate-90' : 'rotate-270'} transition`}
            />
          </button>
          {open && (
            <ul className="bg-gray absolute z-10 mt-2 w-full overflow-hidden rounded-[20px] shadow-lg">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange?.(option.value)
                    setOpen(false)
                  }}
                  className={`cursor-pointer px-9.5 py-3 transition-colors hover:bg-black/10 ${
                    option.value === value ? 'font-semibold' : ''
                  }`}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          )}
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
