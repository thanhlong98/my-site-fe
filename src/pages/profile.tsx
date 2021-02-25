import { useQuery } from '@apollo/client'
import Container from '@components/Container'
import { ME } from '@graphql/queries'
import { withServerSideProps } from '@hocs'
import { MainLayout } from '@layouts'
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
    <MainLayout>
      <Container>
        <div>{JSON.stringify(data)}</div>
      </Container>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps({
  auth: true,
})()

export default ProfilePage