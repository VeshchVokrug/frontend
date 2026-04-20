'use client'

import Input from '@/shared/ui/Input'
import { useState } from 'react'
import { createProfileInputData, createProfileSchema } from '../../model/schema'
import { CATALOG_CATEGORIES } from '@/shared/constants/categories'
import { ZodFormattedError } from 'zod'
import { useCreateProifle } from '../../model/use-create-profile'
import { useRouter } from 'next/navigation'

export default function CreateProfileForm() {
  const { mutate: createProfile } = useCreateProifle()
  const router = useRouter()

  const [profileData, setProfileData] = useState<createProfileInputData>({
    name: '',
    bio: '',
    favoriteCategories: [],
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
    <main className="flex h-full justify-center">
      <form className="flex w-3xl flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="mb-5 text-center text-5xl font-bold">
          Создание профиля
        </h1>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          label="Введите имя"
          value={profileData.name}
          onChange={(evt) =>
            setProfileData((prev) => ({ ...prev, name: evt.target.value }))
          }
          error={errors?.name?._errors.join(', ')}
          required
        />
        <label>
          <p className="mb-1 ml-1.5 block text-sm font-medium text-gray-600">
            Введите информацию о себе
          </p>
          <textarea
            placeholder="Информация о себе"
            name="bio"
            value={profileData.bio}
            onChange={(evt) =>
              setProfileData((prev) => ({ ...prev, bio: evt.target.value }))
            }
            required={false}
            className="w-full resize-none rounded-2xl border border-gray-300 bg-indigo-50 px-2.5 py-1.5"
          />
          {errors?.bio?._errors.length && (
            <p className="mt-1 text-sm text-red-600">
              {errors?.bio?._errors.join(', ')}
            </p>
          )}
        </label>
        <label>
          <p className="mb-1 block text-sm font-medium text-gray-600">
            Выберите любимые категории
          </p>
          <div>
            {CATALOG_CATEGORIES.map(({ title, slug }, index) => (
              <Input
                key={index}
                type="checkbox"
                placeholder={title}
                label={title}
                name="favoriteCategories"
                value={slug}
                onChange={(evt) =>
                  setProfileData((prev) => {
                    const favoriteCategories = prev.favoriteCategories ?? []
                    return {
                      ...prev,
                      favoriteCategories: favoriteCategories.includes(
                        evt.target.value
                      )
                        ? favoriteCategories.filter(
                            (cat) => cat !== evt.target.value
                          )
                        : [...favoriteCategories, evt.target.value],
                    }
                  })
                }
                required={false}
              />
            ))}
          </div>
        </label>

        <button
          type="submit"
          className="bg-main mx-auto w-fit rounded-3xl px-5 py-3 font-medium text-white transition-all hover:opacity-80"
        >
          Создать профиль
        </button>

        {serverErrors && (
          <p className="mt-1 text-sm text-red-600">{serverErrors}</p>
        )}
      </form>
    </main>
  )
}
