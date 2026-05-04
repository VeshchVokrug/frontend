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
      className="bg-gray flex h-fit w-fit min-w-160 flex-col gap-10 rounded-[30px] px-18 py-14"
    >
      <h1 className="text-center text-[36px] font-bold">Войти</h1>
      <div className="flex flex-col gap-7.5">
        <Input
          type="text"
          name="email"
          placeholder="Email"
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
          placeholder="Пароль"
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

      <div className="flex flex-col items-center gap-10 text-center">
        <div>
          <button
            type="submit"
            className="bg-main hover:bg-main-hover active:bg-main-active disabled:bg-disabled w-fit rounded-[20px] px-22.5 py-4 text-[30px] font-medium text-white transition"
          >
            Войти
          </button>
          {serverError && <p className="text-red text-[25px]">{serverError}</p>}
        </div>

        <Link
          href="/register"
          className="text-main text-center text-[30px] underline"
        >
          Зарегистрироваться
        </Link>
      </div>
    </form>
  )
}
