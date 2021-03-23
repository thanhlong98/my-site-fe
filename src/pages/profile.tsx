import { useQuery } from '@apollo/client'
import { ME } from '@graphql/queries'
import { withServerSideProps } from '@hocs'
import { MasterLayout } from '@layout'
import { GetServerSideProps, NextPage } from 'next'

const ProfilePage: NextPage<{}> = () => {
  const { data, loading, error } = useQuery(ME)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <MasterLayout>
      <div>{JSON.stringify(data)}</div>
    </MasterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps({
  auth: true,
})()

export default ProfilePage
