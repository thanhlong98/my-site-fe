import { onError } from '@apollo/client/link/error'

const errorMiddleware = onError(
  ({ graphQLErrors, networkError, response }: any) => {
    if (graphQLErrors) {
      if (response) {
        response.errors = graphQLErrors[0]
      }

      console.log(graphQLErrors)

      // console.log(graphQLErrors)
      if (graphQLErrors[0].code === 'TOKEN_INVALID') {
        const loginUrl = process.env.APP_SERVICE
          ? `/${process.env.APP_SERVICE}/login`
          : '/login'

        if (localStorage.getItem('access-token')) {
          localStorage.clear()
          window.location.href = loginUrl
        }
      }
    }
    if (networkError) {
      console.error(`[Network Error]: ${networkError}`)
    }
  }
)

export { errorMiddleware }
