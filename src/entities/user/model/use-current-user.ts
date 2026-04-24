import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../api/get-current-user'
import { AxiosError } from 'axios'
import { User } from './schema'

export const useCurrentUser = () => {
  return useQuery<User, AxiosError>({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    retry: (failureCount) => failureCount < 3,
  })
}
