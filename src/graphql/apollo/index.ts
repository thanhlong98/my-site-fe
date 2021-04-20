import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import merge from 'deepmerge'
import { IncomingMessage, ServerResponse } from 'http'
import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'
import { errorMiddleware } from './middleware'

export type ResolverContext = {
  req?: IncomingMessage
  res?: ServerResponse
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL
const isBrowser = typeof window !== 'undefined'
const isServer = typeof window === 'undefined'

function createApolloClient(context?: ResolverContext) {
  const authLink = setContext((request, previousContext) => ({
    headers: {
      cookie: context ? context.req.headers.cookie : '',
    },
  }))

  const httpLink = new HttpLink({
    uri: `http://${GRAPHQL_URL}`,
    credentials: 'include',
  })

  const wsLink = isBrowser
    ? new WebSocketLink({
        uri: `ws://${GRAPHQL_URL}`,
        options: {
          reconnect: true,
        },
      })
    : null

  const linkSplit = isBrowser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)

          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

  const link = ApolloLink.from([errorMiddleware, linkSplit])

  return new ApolloClient({
    ssrMode: isServer,
    link: authLink.concat(link),
    connectToDevTools: isBrowser,
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(
  initialState: any = null,
  context?: ResolverContext
) {
  const _apolloClient = apolloClient ?? createApolloClient(context)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])

  return store
}
