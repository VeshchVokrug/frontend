import AdvertPage from '@/views/advert'

export default async function page({
  params,
}: {
  params: Promise<{ category: string; id: string }>
}) {
  const { category, id } = await params

  return <AdvertPage category={category} id={id} />
}
