import { useMutation } from '@apollo/client'
import { LoginForm } from '@components/LoginRegisterPage'
import { LOGIN_FACEBOOK } from '@graphql/mutations'
import React from 'react'
import FacebookLogin from 'react-facebook-login'

const LoginModal = () => {
  const [loginFacebook] = useMutation(LOGIN_FACEBOOK)

  const responseFacebook = async (response) => {
    try {
      const { data } = await loginFacebook({
        variables: {
          accessToken: response.accessToken,
        },
      })

      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <LoginForm />
    </div>
  )
}

export default LoginModal
