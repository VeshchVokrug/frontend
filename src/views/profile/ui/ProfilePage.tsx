import { User } from '@/entities/user/model/schema'
import LogoutButton from '@/features/logout/ui/LogoutButton'
import Image from 'next/image'

export default function ProfilePage({ user }: { user: User }) {
  return (
    <main className="mx-auto max-w-425 min-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Профиль</h1>

      <div className="flex flex-col gap-4">
        <div className="flex gap-6 rounded-2xl border border-gray-200 p-5 shadow-lg">
          <div className="bg-gray aspect-square w-50 rounded-full">
            {user.avatarUrl && (
              <Image
                src={user.avatarUrl}
                alt={`Фотография пользователя ${user.name}`}
              />
            )}
          </div>
          <div className="pt-3">
            <div>
              <p className="text-xs text-gray-400">Имя</p>
              <p className="font-medium text-gray-800">{user.name}</p>
            </div>

            {user.bio && (
              <div>
                <p className="text-xs text-gray-400">О себе</p>
                <p className="font-medium text-gray-800">{user.bio}</p>
              </div>
            )}
          </div>
        </div>

        <LogoutButton />
      </div>
    </main>
  )
}
