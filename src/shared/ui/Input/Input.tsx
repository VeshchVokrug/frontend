'use client'

type Props = {
  type: string
  placeholder?: string
  name: string
  autoComplete?: string
  label?: string
  value: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  required?: boolean
  error?: string
}

export default function Input({
  type = 'text',
  placeholder,
  name,
  autoComplete = 'off',
  label,
  value,
  onChange,
  required = true,
  error,
}: Props) {
  return (
    <label
      className={`${(type === 'checkbox' || type === 'radio') && 'flex items-center gap-3'}`}
    >
      {label && (
        <p
          className={`ml-1.5 block text-sm font-medium text-gray-600 ${(type === 'checkbox' || type === 'radio') ?? 'mb-1'}`}
        >
          {label}
        </p>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required={required}
        className={`rounded-[20px] bg-white px-6 py-5 text-[30px]/[36px] ${type === 'checkbox' || type === 'radio' ? 'accent-main -order-1' : 'w-full'} `}
      />

      {error && (
        <p className="text-red mt-3 text-[25px]">
          {Array.isArray(error) ? error.join(', ') : error}
        </p>
      )}
    </label>
  )
}
