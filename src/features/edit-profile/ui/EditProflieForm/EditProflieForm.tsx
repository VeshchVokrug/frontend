'use client'

import { useRouter } from 'next/navigation'

import ProfileForm, {
  ProfileFormSubmitPayload,
} from '@/shared/ui/ProfileForm/ProfileForm'
import { useEditProifle } from '../../model/use-edit-profile'
import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { queryClient } from '@/app/providers/query-provider'

export function EditProfileForm() {
  const { data: currentUser, isLoading } = useCurrentUser()
  const { mutate, isPending, error } = useEditProifle()
  const router = useRouter()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!currentUser) {
    return <div>Ошибка загрузки профиля</div>
  }

  const handleSubmit = ({ data, avatarUrl, currentAvatarUrls }: ProfileFormSubmitPayload) => {
    const finalAvatarUrl = avatarUrl ?? (currentAvatarUrls.length > 0 ? currentAvatarUrls[0] : '')
    mutate(
      { ...data, avatarUrl: finalAvatarUrl },
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
        name: currentUser.name,
        bio: currentUser.bio,
        phoneNumber: currentUser.phoneNumber,
      }}
      initialAvatarUrls={currentUser.avatarUrl ? [currentUser.avatarUrl] : undefined}
      onSubmit={handleSubmit}
      isLoading={isPending}
      serverError={error?.message}
    />
  )
}
