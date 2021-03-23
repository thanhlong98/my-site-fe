import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@graphql/apollo'
import { LoginRegisterLayout } from '@layout'
import { store } from '@store'
import { AnimatePresence } from 'framer-motion'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'
import '../styles/globals.less'

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const router = useRouter()

  if (['/register', '/login'].includes(router.pathname)) {
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <LoginRegisterLayout>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </LoginRegisterLayout>
        </ApolloProvider>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} key={router.route} />
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
