'use client'

import { usePlural } from '@/shared/lib/pluralize'
import { useState } from 'react'

type Props = {
  available: number
  price: number
  endDate: Date
}

export default function ShareCard({ available, price, endDate }: Props) {
  const [share, setShare] = useState(0)

  return (
    <section className="bg-gray shadow-shadow max-w-142.5 rounded-[30px] p-7.5 shadow-md/40">
      <h2 className="mb-4.5 text-[34px] font-bold">Доли</h2>
      <div className="mb-3.75 flex items-center gap-7">
        <p className="text-[26px]">Приобрести</p>
        <div className="flex h-15 w-45 justify-between rounded-[5px] bg-white">
          <button
            className="border-gray text-main hover:text-main-hover active:text-main-active disabled:text-secondary w-15 border-r text-[30px]"
            disabled={share <= 0}
            onClick={() => setShare((prev) => prev - 1)}
          >
            -
          </button>
          <input
            value={share}
            onChange={(evt) => setShare(Number(evt.target.value))}
            className="w-15 text-center text-[26px]"
          />
          <button
            className="border-gray text-main hover:text-main-hover active:text-main-active disabled:text-secondary w-15 border-l text-[30px]"
            disabled={share >= available}
            onClick={() => setShare((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>
      <p className="mb-2.5 text-[26px]">
        Стоимость: <span className="text-[30px] font-bold">{price}₽</span>
      </p>
      <p className="mb-2.5 text-[26px]">
        Доступно сейчас к покупке:{' '}
        <span className="text-[30px] font-bold">
          {available} {usePlural(available, ['доля', 'доли', 'долей'])}
        </span>
      </p>
      <p className="mb-5 text-[26px]">
        Заявка закроется:{' '}
        <span className="text-[30px] font-bold">
          {endDate.toLocaleDateString('ru-RU')}
        </span>
      </p>

      <button
        className="bg-main hover:bg-main-hover active:bg-main-active disabled:bg-disabled ml-auto flex h-13 w-51.25 items-center justify-center rounded-[30px] text-[18px]/[22px] font-bold text-white"
        disabled={
          !(
            share > 0 &&
            share <= available &&
            endDate.getTime() >= new Date().getTime()
          )
        }
      >
        Приобрести долю
      </button>
    </section>
  )
}
