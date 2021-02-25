import { useQuery } from '@apollo/client'
import { ME } from '@graphql/queries'

export function useAuth() {
  const { data, loading, error } = useQuery(ME)

  return {
    me: data?.me,
  }
}
