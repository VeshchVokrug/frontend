export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="mx-auto flex h-screen w-fit items-center">{children}</main>
  )
}
