export default async function page({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  return (
    <>
      <h1>{category}</h1>
    </>
  )
}
