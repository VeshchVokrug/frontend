import { useQuery } from '@tanstack/react-query'
import { getUser } from '../api/get-user'
import { User } from './schema'
import { AxiosError } from 'axios'

export const useUser = (id: string) => {
  return useQuery<User, AxiosError>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    retry: (failureCount) => failureCount < 3,
  })
}
