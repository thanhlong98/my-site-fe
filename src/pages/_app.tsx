import '../styles/globals.scss'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@graphql/apollo'
import { store } from '@store'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { theme } from '@utils'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <Head>
            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
          </Head>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
