import { useQuery } from '@apollo/client'
import Container from '@components/Container'
import { HELLO } from '@graphql/queries'
import { withServerSideProps } from '@hocs'
import { MainLayout } from '@layouts'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

const HomePage = () => {
  const { data, loading } = useQuery(HELLO)

  return (
    <MainLayout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <p>{data?.hello}</p>
      </Container>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps({
  auth: false,
})(async (context, apolloClient) => {
  await apolloClient.query({
    query: HELLO,
  })

  return {
    initialApolloState: apolloClient.cache.extract(),
  }
})

export default HomePage
