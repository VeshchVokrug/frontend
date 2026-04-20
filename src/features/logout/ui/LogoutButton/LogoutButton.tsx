import { useRouter } from 'next/navigation'
import { useLogout } from '../../model/use-logout'

export default function LogoutButton() {
  const { mutate: logout } = useLogout()
  const router = useRouter()

  const handleClick = () => {
    logout()
    router.push('/')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-red ml-auto w-fit rounded-3xl px-5 py-2 font-medium text-white transition hover:bg-red-600"
    >
      Выйти из аккаунта
    </button>
  )
}
