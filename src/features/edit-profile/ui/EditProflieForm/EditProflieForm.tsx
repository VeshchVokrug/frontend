'use client'

import { useRouter } from 'next/navigation'

import ProfileForm, {
  ProfileFormSubmitPayload,
} from '@/shared/ui/ProfileForm/ProfileForm'
import { useEditProifle } from '../../model/use-edit-profile'
import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { queryClient } from '@/app/providers/query-provider'

export function EditProfileForm() {
  const { data: currentUser } = useCurrentUser()
  const { mutate, isPending, error } = useEditProifle()
  const router = useRouter()

  const handleSubmit = ({ data }: ProfileFormSubmitPayload) => {
    mutate(
      { ...data },
      {
        onSuccess: () => {
          router.push('/profile')
          queryClient.invalidateQueries({ queryKey: ['current-user'] })
        },
      }
    )
  }

  return (
    <ProfileForm
      title="Редактирование профиля"
      initialData={{
        name: currentUser?.name,
        bio: currentUser?.bio,
        phone: currentUser?.phone,
      }}
      onSubmit={handleSubmit}
      isLoading={isPending}
      serverError={error?.message}
    />
  )
}
