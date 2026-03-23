'use client'

import Input from '@/shared/ui/Input'
import { useLogin } from '../../model/use-login'
import { useState } from 'react'
import { LoginInputData, loginSchema } from '../../model/schema'
import { ZodFormattedError } from 'zod'

export default function LoginForm() {
  const { mutate: login } = useLogin()
  const [loginInputData, setLoginInputData] = useState<LoginInputData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<ZodFormattedError<LoginInputData>>()

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()

    const validationResult = loginSchema.safeParse(loginInputData)

    if (!validationResult.success) {
      setErrors(validationResult.error.format())
      return
    }

    login(validationResult.data)
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex h-fit w-sm flex-col gap-4 rounded-2xl border border-gray-200 p-5 shadow-lg"
    >
      <h1 className="text-center text-2xl font-bold text-gray-800">Войти</h1>
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
          setLoginInputData((prev) => ({ ...prev, password: evt.target.value }))
        }
        required={true}
        error={errors?.password?._errors.join(', ')}
      />

      <button
        type="submit"
        className="rounded-sm bg-indigo-600 p-1 font-medium text-white transition-all hover:bg-indigo-700"
      >
        Войти
      </button>
    </form>
  )
}
