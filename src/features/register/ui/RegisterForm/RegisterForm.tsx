'use client'

import Input from '@/shared/ui/Input'
import { ZodFormattedError } from 'zod'
import { RegisterInputData, registerSchema } from '../../model/schema'
import { useRegister } from '../../model/use-register'
import { useState } from 'react'

export default function RegisterForm() {
  const { mutate: login } = useRegister()
  const [registerInputData, setRegisterInputData] = useState<RegisterInputData>(
    {
      email: '',
      password: '',
      confirmPassword: '',
    }
  )
  const [errors, setErrors] = useState<ZodFormattedError<RegisterInputData>>()

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()

    const validationResult = registerSchema.safeParse(registerInputData)

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
      <h1 className="text-center text-2xl font-bold text-gray-800">
        Зарегистрироваться
      </h1>
      <Input
        type="text"
        name="email"
        placeholder="Email"
        label="Введите email"
        value={registerInputData.email}
        onChange={(evt) =>
          setRegisterInputData((prev) => ({ ...prev, email: evt.target.value }))
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

      <button
        type="submit"
        className="rounded-sm bg-indigo-600 p-1 font-medium text-white transition-all hover:bg-indigo-700"
      >
        Зарегистрироваться
      </button>
    </form>
  )
}
