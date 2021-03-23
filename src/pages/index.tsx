import { HELLO } from '@graphql/queries'
import { withServerSideProps } from '@hocs'
import { MasterLayout } from '@layout'
import { GetServerSideProps } from 'next'

const HomePage = () => {
  return (
    <MasterLayout>
      <div className="container">Hello World</div>
    </MasterLayout>
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
