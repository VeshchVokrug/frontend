import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../api/get-current-user'
import { AxiosError } from 'axios'
import { User } from './schema'
import { tokenStorage } from '@/shared/lib/tokens'

export const useCurrentUser = () => {
  return useQuery<User, AxiosError>({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    enabled: !!tokenStorage.getAccessToken(),
    retry: (failureCount) => failureCount < 3,
  })
}
