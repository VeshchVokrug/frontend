'use client'

import { toast } from 'sonner'

type Props = {
  mode: 'rent' | 'create'
  buttonText: string
  disabled: boolean
  error: string
  onConfirm: () => void
  onReset: () => void
  showToast?: boolean
}

export default function CalendarFooter({
  mode,
  error,
  disabled,
  buttonText,
  onConfirm,
  onReset,
  showToast = true,
}: Props) {
  const handleConfirm = () => {
    onConfirm()
    if (showToast) {
      toast.success('Даты добавлены')
    }
  }

  return (
    <>
      <div className="mt-5 flex items-center justify-between">
        {mode === 'rent' && (
          <button
            className="text-disabled hover:text-main-hover active:text-main-active text-[20px] transition"
            onClick={onReset}
            type="button"
          >
            Сбросить
          </button>
        )}
        <button
          className="bg-main hover:bg-main-hover disabled:bg-disabled active:bg-main-active ml-auto rounded-4xl px-7.5 py-2.5 text-[18px] font-bold text-white transition"
          disabled={disabled}
          onClick={handleConfirm}
          type="button"
        >
          {buttonText}
        </button>
      </div>
      {error && <p className="text-red text-2xl">{error}</p>}
    </>
  )
}
