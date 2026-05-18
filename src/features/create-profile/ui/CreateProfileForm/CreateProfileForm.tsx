'use client'

import { useRouter } from 'next/navigation'

import ProfileForm from '@/shared/ui/ProfileForm'
import { ProfileFormSubmitPayload } from '@/shared/ui/ProfileForm/ProfileForm'
import { useCreateProifle } from '../../model/use-create-profile'

export default function CreateProfileForm() {
  const { mutate, isPending, error } = useCreateProifle()
  const router = useRouter()

  const handleSubmit = ({ data }: ProfileFormSubmitPayload) => {
    mutate({ ...data }, { onSuccess: () => router.push('/profile') })
  }

  return (
    <ProfileForm
      title="Создание профиля"
      onSubmit={handleSubmit}
      isLoading={isPending}
      serverError={error?.message}
    />
  )
}
