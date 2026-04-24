'use client'

type Props = {
  name: string
  label?: string
  value: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  isActive?: boolean
}

export default function RadioInput({
  name,
  label,
  value,
  onChange,
  isActive,
}: Props) {
  return (
    <label className="flex items-center gap-2.5">
      <input
        type="radio"
        value={value}
        name={name}
        onChange={onChange}
        className="peer hidden"
        checked={isActive}
      />
      <div className="peer-checked:bg-main h-5 w-5 cursor-pointer rounded-full bg-white"></div>
      <span className="text-2xl">{label}</span>
    </label>
  )
}
