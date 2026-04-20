'use client'

import Input from '@/shared/ui/Input'
import { ZodFormattedError } from 'zod'
import { RegisterInputData, registerSchema } from '../../model/schema'
import { useRegister } from '../../model/use-register'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterForm() {
  const { mutate: register } = useRegister()
  const router = useRouter()
  const [registerInputData, setRegisterInputData] = useState<RegisterInputData>(
    {
      email: '',
      password: '',
      confirmPassword: '',
    }
  )

  const [errors, setErrors] =
    useState<ZodFormattedError<RegisterInputData> | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    setErrors(null)
    setServerError(null)

    const validationResult = registerSchema.safeParse(registerInputData)

    if (!validationResult.success) {
      setErrors(validationResult.error.format())
      return
    }

    register(validationResult.data, {
      onSuccess: () => router.push('/profile'),
      onError: (error) =>
        setServerError(error.response?.data?.message ?? 'Ошибка регистрации'),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex h-fit w-sm flex-col gap-4 rounded-2xl border border-gray-200 p-5 shadow-lg"
    >
      <h1 className="text-center text-2xl font-bold text-gray-800">
        Зарегистрироваться
      </h1>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          name="email"
          placeholder="Email"
          label="Введите email"
          value={registerInputData.email}
          onChange={(evt) =>
            setRegisterInputData((prev) => ({
              ...prev,
              email: evt.target.value,
            }))
          }
          required={true}
          error={errors?.email?._errors.join(', ')}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          label="Введите пароль"
          value={registerInputData.password}
          onChange={(evt) =>
            setRegisterInputData((prev) => ({
              ...prev,
              password: evt.target.value,
            }))
          }
          required={true}
          error={errors?.password?._errors.join(', ')}
        />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Password"
          label="Потвердите пароль"
          value={registerInputData.confirmPassword}
          onChange={(evt) =>
            setRegisterInputData((prev) => ({
              ...prev,
              confirmPassword: evt.target.value,
            }))
          }
          required={true}
          error={errors?.confirmPassword?._errors.join(', ')}
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-main w-full rounded-2xl p-1 font-medium text-white transition-all hover:opacity-80"
        >
          Зарегистрироваться
        </button>
        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
      </div>

      <div className="text-center">
        <p className="text-secondary text-sm">Уже есть аккаунт?</p>
        <Link href="/login" className="text-main underline">
          Войти
        </Link>
      </div>
    </form>
  )
}
