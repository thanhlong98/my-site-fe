import { useMutation } from '@apollo/client'
import { LoginForm } from '@components/LoginPage'
import { LOGIN, LOGIN_FACEBOOK } from '@graphql/mutations'
import { withServerSideProps } from '@hocs'
import { MainLayout } from '@layout'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const LoginPage = () => {
  const [loginFacebook] = useMutation(LOGIN_FACEBOOK)
  const [loginLocal] = useMutation(LOGIN)

  const [userInfo, setUserInfo] = useState({
    email: 'long1@gmail.com',
    password: '123456',
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await loginLocal({
        variables: {
          ...userInfo,
        },
      })

      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

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
    <MainLayout hasFooter={false}>
      <section className="login-page page">
        <div className="login-container">
          <h3>Login Page</h3>

          <LoginForm />

          <FacebookLogin
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <button onClick={renderProps.onClick}>
                This is my custom FB button
              </button>
            )}
          />
        </div>
      </section>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps()()

export default LoginPage
