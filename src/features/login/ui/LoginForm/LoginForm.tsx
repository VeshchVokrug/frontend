'use client'

import Input from '@/shared/ui/Input'
import { useLogin } from '../../model/use-login'
import { useState } from 'react'
import { LoginInputData, loginSchema } from '../../model/schema'
import { ZodFormattedError } from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm() {
  const { mutate: login } = useLogin()
  const router = useRouter()
  const [loginInputData, setLoginInputData] = useState<LoginInputData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] =
    useState<ZodFormattedError<LoginInputData> | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    setErrors(null)
    setServerError(null)

    const validationResult = loginSchema.safeParse(loginInputData)

    if (!validationResult.success) {
      setErrors(validationResult.error.format())
      return
    }

    login(validationResult.data, {
      onSuccess: () => router.push('/profile'),
      onError: () => setServerError('Неверный email или пароль'),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex h-fit w-sm flex-col gap-4 rounded-2xl border border-gray-200 p-5 shadow-lg"
    >
      <h1 className="text-center text-2xl font-bold text-gray-800">Войти</h1>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          name="email"
          placeholder="Email"
          label="Введите email"
          value={loginInputData.email}
          onChange={(evt) =>
            setLoginInputData((prev) => ({ ...prev, email: evt.target.value }))
          }
          required={true}
          error={errors?.email?._errors.join(', ')}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          label="Введите пароль"
          value={loginInputData.password}
          onChange={(evt) =>
            setLoginInputData((prev) => ({
              ...prev,
              password: evt.target.value,
            }))
          }
          required={true}
          error={errors?.password?._errors.join(', ')}
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-main w-full rounded-2xl p-1 font-medium text-white transition-all hover:opacity-80"
        >
          Войти
        </button>
        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
      </div>
      <div className="text-center">
        <p className="text-secondary text-sm">Еще нет аккаунта?</p>
        <Link href="/register" className="text-main underline">
          Зарегистрироваться
        </Link>
      </div>
    </form>
  )
}
