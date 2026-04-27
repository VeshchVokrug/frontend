type Props = {
  type?: string
  name: string
  value: string | number
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  label: string
  placeholder?: string
  error?: string
}

export default function AdvertInput({
  type = 'text',
  name,
  value,
  onChange,
  label,
  placeholder,
  error,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="flex">
        <span className="w-full max-w-77.5 text-[32px] font-bold">{label}</span>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-gray min-h-39 w-full resize-none rounded-[30px] px-9.5 py-3.75 text-[24px]"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`bg-gray w-full rounded-[30px] px-9.5 py-3.75 text-[24px] ${type === 'number' && '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'}`}
          />
        )}
      </label>

      {error && (
        <p className="text-red mt-1 text-[25px]">
          {Array.isArray(error) ? error.join(', ') : error}
        </p>
      )}
    </div>
  )
}
