import { useMutation } from '@apollo/client'
import LoginForm from '@components/LoginForm'
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
    <div className="bg-white px-4 py-5 border rounded shadow-xl">
      <h3>Login</h3>
      <LoginForm />
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  )
}

export default LoginModal
