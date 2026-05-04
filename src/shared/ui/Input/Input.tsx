'use client'

type Props = {
  type?: string
  name: string
  value: string | number | undefined
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  label?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  error?: string | string[]

  layout?: 'vertical' | 'horizontal'
  size?: 'md' | 'lg'
  variant?: 'default' | 'filled'
}

export default function Input({
  type = 'text',
  name,
  value,
  onChange,
  label,
  placeholder,
  autoComplete = 'off',
  required = true,
  error,

  layout = 'vertical',
  size = 'md',
  variant = 'default',
}: Props) {
  const isTextarea = type === 'textarea'
  const isHorizontal = layout === 'horizontal'

  const sizeStyles = {
    md: {
      input: 'px-6 py-5 text-[30px]/[36px] rounded-[20px]',
      textarea: 'px-6 py-5 text-[30px]/[36px] rounded-[20px]',
      label: 'text-sm font-medium',
      gap: 'gap-2',
    },
    lg: {
      input: 'px-9.5 py-3.75 text-[24px] rounded-[30px]',
      textarea:
        'px-9.5 py-3.75 text-[24px] rounded-[30px] min-h-39 resize-none',
      label: 'text-[32px] font-bold',
      gap: 'gap-4',
    },
  }
  const variantStyles = {
    default: 'bg-white',
    filled: 'bg-gray',
  }

  const numberFix =
    type === 'number'
      ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
      : ''

  return (
    <div className="flex w-full flex-col">
      <div
        className={` ${isHorizontal ? 'flex items-center' : 'flex flex-col'} ${!isHorizontal && sizeStyles[size].gap} w-full`}
      >
        {label && (
          <label
            htmlFor={name}
            className={` ${sizeStyles[size].label} ${isHorizontal ? 'w-full max-w-76.5' : 'ml-1.5'} `}
          >
            {label}
          </label>
        )}

        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full resize-none ${sizeStyles[size].textarea} ${variantStyles[variant]} `}
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            className={`w-full ${sizeStyles[size].input} ${variantStyles[variant]} ${numberFix} `}
          />
        )}
      </div>

      {error && (
        <p
          className={`text-red ${size === 'lg' ? 'mt-1 text-[25px]' : 'mt-3 text-[20px]'} `}
        >
          {Array.isArray(error) ? error.join(', ') : error}
        </p>
      )}
    </div>
  )
}
