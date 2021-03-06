import { useMutation } from '@apollo/client'
import Container from '@components/Container'
import LoginForm from '@components/LoginForm'
import { LOGIN_FACEBOOK } from '@graphql/mutations'
import { withServerSideProps } from '@hocs'
import { MainLayout } from '@layouts'
import { GetServerSideProps } from 'next'
import React from 'react'
import FacebookLogin from 'react-facebook-login'

const LoginPage = () => {
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
    <MainLayout>
      <Container>
        <h3>Login Page</h3>
        <div className="border py-4 px-2 bg-white rounded shadow-lg">
          <LoginForm />
          <FacebookLogin
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
      </Container>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps()()

export default LoginPage
