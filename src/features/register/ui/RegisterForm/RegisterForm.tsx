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
      className="bg-gray flex h-fit w-fit min-w-160 flex-col gap-10 rounded-[30px] px-18 py-14"
    >
      <h1 className="text-center text-[36px] font-bold">Зарегистрироваться</h1>
      <div className="flex flex-col gap-7.5">
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

      <div className="flex flex-col items-center gap-10 text-center">
        <div>
          <button
            type="submit"
            className="bg-main hover:bg-main-hover active:bg-main-active disabled:bg-disabled w-fit rounded-[20px] px-12.5 py-4 text-[30px] font-medium text-white transition"
          >
            Зарегистрироваться
          </button>
          {serverError && (
            <p className="text-[25px] text-red-500">{serverError}</p>
          )}
        </div>

        <Link
          href="/login"
          className="text-main text-center text-[30px] underline"
        >
          Войти
        </Link>
      </div>
    </form>
  )
}
