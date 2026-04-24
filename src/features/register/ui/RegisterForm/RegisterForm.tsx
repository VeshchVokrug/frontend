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
      className="bg-gray flex h-fit w-fit min-w-187.5 flex-col gap-13 rounded-[30px] p-18 pb-12"
    >
      <h1 className="text-center text-[50px] font-bold text-gray-800">
        Зарегистрироваться
      </h1>
      <div className="flex flex-col gap-10">
        <Input
          type="text"
          name="email"
          placeholder="Email"
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
          placeholder="Пароль"
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
          placeholder="Подтвердите пароль"
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

      <div className="flex flex-col items-center gap-7.5">
        <div>
          <button
            type="submit"
            className="bg-main w-fit rounded-[20px] p-1 px-15 py-4 text-[40px] font-medium text-white transition-all hover:opacity-80"
          >
            Зарегистрироваться
          </button>
          {serverError && (
            <p className="text-[40px] text-red-500">{serverError}</p>
          )}
        </div>

        <Link
          href="/login"
          className="text-main text-center text-[36px] underline"
        >
          Войти
        </Link>
      </div>
    </form>
  )
}
