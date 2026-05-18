'use client'

import { useState } from 'react'
import { ZodFormattedError } from 'zod'
import Input from '@/shared/ui/Input'
import UploadInput from '@/shared/ui/UploadInput'
import { profileFormSchema, ProfileFormData } from './schema'

export type ProfileFormSubmitPayload = {
  data: ProfileFormData
  avatarFiles: File[]
  shouldDeleteAvatar: boolean
}

type Props = {
  title: string
  initialData?: Partial<ProfileFormData>
  initialAvatarUrl?: string
  onSubmit: (payload: ProfileFormSubmitPayload) => void
  isLoading?: boolean
  serverError?: string | null
}

export default function ProfileForm({
  title,
  initialData,
  initialAvatarUrl,
  onSubmit,
  isLoading = false,
  serverError = null,
}: Props) {
  const [fullName, setFullName] = useState({
    firstName: initialData?.name?.split(' ')[0] ?? '',
    lastName: initialData?.name?.split(' ')[1] ?? '',
  })

  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialData?.name ?? '',
    bio: initialData?.bio ?? '',
    phone: initialData?.phone ?? '',
  })

  const [avatarFiles, setAvatarFiles] = useState<File[]>([])
  const [shouldDeleteAvatar, setShouldDeleteAvatar] = useState(false)

  const [errors, setErrors] =
    useState<ZodFormattedError<ProfileFormData> | null>(null)

  const handleFirstNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...fullName, firstName: evt.target.value }
    setFullName(updated)
    setFormData((prev) => ({
      ...prev,
      name: [updated.firstName, updated.lastName].filter(Boolean).join(' '),
    }))
  }

  const handleLastNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...fullName, lastName: evt.target.value }
    setFullName(updated)
    setFormData((prev) => ({
      ...prev,
      name: [updated.firstName, updated.lastName].filter(Boolean).join(' '),
    }))
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    setErrors(null)

    const validationResult = profileFormSchema.safeParse(formData)

    if (!validationResult.success) {
      setErrors(validationResult.error.format())
      return
    }

    onSubmit({
      data: validationResult.data,
      avatarFiles,
      shouldDeleteAvatar,
    })
  }

  return (
    <main className="h-full w-full">
      <form className="flex w-325 flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="mb-16.25 text-left text-[36px] font-bold">{title}</h1>

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
                onChange={handleFirstNameChange}
                error={errors?.name?._errors.join(', ')}
                required
                layout="horizontal"
                size="lg"
                variant="filled"
              />

              <Input
                type="text"
                name="lastName"
                placeholder="Введите фамилию"
                value={fullName.lastName}
                onChange={handleLastNameChange}
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
              value={formData.phone}
              onChange={(evt) =>
                setFormData((prev) => ({ ...prev, phone: evt.target.value }))
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
              value={formData.bio}
              onChange={(evt) =>
                setFormData((prev) => ({ ...prev, bio: evt.target.value }))
              }
              required={false}
              error={errors?.bio?._errors.join(', ')}
              layout="horizontal"
              size="lg"
              variant="filled"
            />
          </fieldset>

          <UploadInput
            label="Фото профиля"
            initialUrl={initialAvatarUrl}
            onChange={(newFiles) => setAvatarFiles(newFiles)}
            onRemoveExisting={() => setShouldDeleteAvatar(true)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-main hover:bg-main-hover disabled:bg-disabled active:bg-main-active mt-18.5 w-fit rounded-3xl px-7.5 py-5 text-[30px]/[36px] font-bold text-white transition-all"
        >
          {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>

        {serverError && (
          <p className="mt-1 text-sm text-red-600">{serverError}</p>
        )}
      </form>
    </main>
  )
}
