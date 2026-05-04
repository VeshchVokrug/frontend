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
      className="bg-main hover:bg-main-hover shadow-shadow active:bg-main-active w-full max-w-80 rounded-[30px] py-3.25 text-[30px]/[36px] font-bold text-white shadow-md/30 transition"
    >
      Выйти
    </button>
  )
}
