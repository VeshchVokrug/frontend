import { useState } from 'react'
import Input from '@/shared/ui/Input'
import RadioInput from '@/shared/ui/RadioInput'

type PriceFilterProps = {
  minPrice: string
  maxPrice: string
  onChange: (min: string, max: string) => void
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  onChange,
}: PriceFilterProps) {
  const [localMin, setLocalMin] = useState(minPrice)
  const [localMax, setLocalMax] = useState(maxPrice)

  return (
    <div className="mb-10">
      <h2 className="mb-6 text-3xl font-medium">Цена</h2>
      <div className="mb-5 flex items-center gap-2.5">
        <p className="text-2xl">от</p>
        <div className="w-22.5">
          <Input
            type="number"
            name="minPrice"
            value={localMin}
            onChange={(evt) => {
              setLocalMin(evt.target.value)
              onChange(evt.target.value, localMax)
            }}
          />
        </div>
        <p className="text-2xl">до</p>
        <div className="w-22.5">
          <Input
            type="number"
            name="maxPrice"
            value={localMax}
            onChange={(evt) => {
              setLocalMax(evt.target.value)
              onChange(localMin, evt.target.value)
            }}
          />
        </div>
      </div>

      <RadioInput
        name="anyPrice"
        value="any"
        label="Неважно"
        onChange={() => {
          setLocalMin('')
          setLocalMax('')
          onChange('', '')
        }}
        isActive={!localMin && !localMax}
      />
    </div>
  )
}
