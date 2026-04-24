import { DateOption } from '@/shared/constants/filter'
import RadioInput from '@/shared/ui/RadioInput'

type Props = {
  dates: DateOption[]
  date: string
  onChange: (value: string) => void
}

export default function DateFilter({ date, dates, onChange }: Props) {
  return (
    <div className="mb-10">
      <h2 className="mb-6 text-3xl font-medium">Дата аренды</h2>
      <div className="flex flex-col gap-5">
        {dates.map(({ value, label }) => (
          <RadioInput
            key={value}
            name="date"
            value={value}
            label={label}
            onChange={(evt) => onChange(evt.target.value)}
            isActive={date === value}
          />
        ))}
      </div>
    </div>
  )
}
