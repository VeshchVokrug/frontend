'use client'

import Input from '@/shared/ui/Input'
import { useState } from 'react'
import { createProfileInputData, createProfileSchema } from '../../model/schema'

import { ZodFormattedError } from 'zod'
import { useCreateProifle } from '../../model/use-create-profile'
import { useRouter } from 'next/navigation'
import UploadInput from '@/shared/ui/UploadInput'

export default function CreateProfileForm() {
  const { mutate: createProfile } = useCreateProifle()
  const router = useRouter()

  const [fullName, setFullName] = useState<{
    firstName: string
    lastName: string
  }>({
    firstName: '',
    lastName: '',
  })

  const [profileData, setProfileData] = useState<createProfileInputData>({
    name: '',
    bio: '',
    phone: '',
  })

  const [errors, setErrors] =
    useState<ZodFormattedError<createProfileInputData> | null>(null)
  const [serverErrors, setServerErorrs] = useState<string | null>(null)

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    setErrors(null)

    const validationResult = createProfileSchema.safeParse(profileData)

    if (!validationResult.success) {
      setErrors(validationResult.error.format())
      return
    }

    createProfile(profileData, {
      onSuccess: () => router.push('/profile'),
      onError: (err) => setServerErorrs(err.message),
    })
  }

  return (
    <main className="h-full w-full">
      <form className="flex w-325 flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="mb-16.25 text-left text-[36px] font-bold">
          Создание профиля
        </h1>

        <div className="flex flex-col gap-7.75">
          <fieldset className="flex w-full max-w-284">
            <p className="w-full max-w-77.5 text-[32px] font-bold">
              Имя и фамилия
            </p>

            <div className="flex w-full gap-6.5">
              <Input
                type="text"
                name="firstName"
                placeholder="Введите имя"
                value={fullName.firstName}
                onChange={(evt) =>
                  setFullName((prev) => {
                    const fullName = { ...prev, firstName: evt.target.value }
                    setProfileData((prev) => ({
                      ...prev,
                      name: Object.values(fullName).join(' '),
                    }))

                    return fullName
                  })
                }
                error={errors?.name?._errors.join(', ')}
                required
                layout="horizontal"
                size="lg"
                variant="filled"
              />

              <Input
                type="text"
                placeholder="Введите фамилию"
                name="lastName"
                value={fullName.lastName}
                onChange={(evt) =>
                  setFullName((prev) => {
                    const fullName = { ...prev, lastName: evt.target.value }
                    setProfileData((prev) => ({
                      ...prev,
                      name: Object.values(fullName).join(' '),
                    }))

                    return fullName
                  })
                }
                error={errors?.name?._errors.join(', ')}
                required={false}
                layout="horizontal"
                size="lg"
                variant="filled"
              />
            </div>
          </fieldset>

          <fieldset className="max-w-229.5">
            <Input
              type="tel"
              label="Телефон"
              placeholder="Ваш номер в формате +7( )"
              name="phone"
              value={profileData.phone}
              onChange={(evt) =>
                setProfileData((prev) => ({ ...prev, phone: evt.target.value }))
              }
              required={false}
              layout="horizontal"
              size="lg"
              variant="filled"
              error={errors?.phone?._errors.join(', ')}
            />
          </fieldset>

          <fieldset className="max-w-284">
            <Input
              type="textarea"
              label="Описание профиля"
              placeholder="Добавьте описание профиля"
              name="bio"
              value={profileData.bio}
              onChange={(evt) =>
                setProfileData((prev) => ({ ...prev, bio: evt.target.value }))
              }
              required={false}
              error={errors?.bio?._errors.join(', ')}
              layout="horizontal"
              size="lg"
              variant="filled"
            />
          </fieldset>

          <UploadInput label="Фото профиля" />
        </div>

        <button
          type="submit"
          className="bg-main hover:bg-main-hover disabled:bg-disabled active:bg-main-active mt-18.5 w-fit rounded-3xl px-7.5 py-5 text-[30px]/[36px] font-bold text-white transition-all"
        >
          Сохранить
        </button>

        {serverErrors && (
          <p className="mt-1 text-sm text-red-600">{serverErrors}</p>
        )}
      </form>
    </main>
  )
}
