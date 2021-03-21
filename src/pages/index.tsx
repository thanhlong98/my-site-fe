import { Intro } from '@components/HomePage'
import { HELLO } from '@graphql/queries'
import { withServerSideProps } from '@hocs'
import { MainLayout } from '@layout'
import { GetServerSideProps } from 'next'
import { Button } from 'antd'

const HomePage = () => {
  return (
    <MainLayout hasFooter={false} mode="dark">
      <Intro />
      <Button>Click</Button>
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
