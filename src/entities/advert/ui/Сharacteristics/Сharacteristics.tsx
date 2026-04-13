type Props = {
  category: string
  description: string
}

export default function AdvertСharacteristics({
  category,
  description,
}: Props) {
  return (
    <section>
      <h2 className="mb-4 text-4xl font-bold">Характеристики товара:</h2>
      <ul>
        {category && (
          <li>
            <p className="text-3xl">
              <span className="text-secondary">Категория товара:</span>
              {category}
            </p>
          </li>
        )}
        {description && (
          <li>
            <p className="text-3xl">
              <span className="text-secondary">Описание товара: </span>
              {description}
            </p>
          </li>
        )}
      </ul>
    </section>
  )
}
