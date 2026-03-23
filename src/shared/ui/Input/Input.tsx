'use client'

type Props = {
  type: string
  placeholder: string
  name: string
  autoComplete?: string
  label: string
  value: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  required: boolean
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
    <label>
      <p className="mb-1 block text-sm font-medium text-gray-600">{label}</p>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-gray-300 bg-indigo-100 p-1"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {Array.isArray(error) ? error.join(', ') : error}
        </p>
      )}
    </label>
  )
}
