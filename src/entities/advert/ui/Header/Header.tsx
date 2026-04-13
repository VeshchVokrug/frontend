type Props = {
  title: string
  price: number
}

export default function AdvertHeader({ title, price }: Props) {
  return (
    <section className="mt-7.5">
      <h1 className="mb-9.5 text-[40px] font-bold">{title}</h1>
      <div className="flex justify-between">
        <p className="text-[50px] font-bold">
          {price}
          <span>₽</span>
        </p>

        <button className="bg-main rounded-4xl px-7.5 py-5 text-3xl font-bold text-white transition hover:opacity-80">
          Добавить в избранное
        </button>
      </div>
    </section>
  )
}
