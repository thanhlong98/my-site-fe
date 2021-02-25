import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { ACCESS_TOKEN_NAME } from '@constants'
import { initializeApollo } from '@graphql/apollo'
import { ME } from '@graphql/queries'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import nookies from 'nookies'

type Props = {
  [key: string]: any
  initialApolloState: NormalizedCacheObject
}

const withServerSideProps = ({ auth = false } = {}) => (
  getServerSidePropsFunc?: (
    context: GetServerSidePropsContext,
    apolloClient: ApolloClient<NormalizedCacheObject>,
    user: any
  ) => Promise<Props> | Props
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<Props>> => {
    const token = nookies.get(context)[ACCESS_TOKEN_NAME]

    let user = null
    const apolloClient = initializeApollo(null, context)

    if (token) {
      try {
        const { data, error } = await apolloClient.query({
          query: ME,
        })

        user = data?.me

        if (error) {
          user = null
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (auth && !user) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      }
    }
    if (
      user &&
      (context.resolvedUrl.includes('login') ||
        context.resolvedUrl.includes('register'))
    ) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    if (getServerSidePropsFunc) {
      return {
        props: {
          user,
          ...(await getServerSidePropsFunc(context, apolloClient, user)),
        },
      }
    }

    return {
      props: {
        user,
        initialApolloState: apolloClient.cache.extract(),
      },
    }
  }
}

export { withServerSideProps }
