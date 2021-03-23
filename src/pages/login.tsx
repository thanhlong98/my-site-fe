import { useMutation } from '@apollo/client'
import { LoginForm } from '@components/LoginPage'
import { LOGIN, LOGIN_FACEBOOK } from '@graphql/mutations'
import { withServerSideProps } from '@hocs'
import { Button, Col, Row, Typography } from 'antd'
import { motion, Variants } from 'framer-motion'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'

const { Title } = Typography

const easing = [0.6, -0.05, 0.01, 0.99]

const fadeInUp: Variants = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
}

const LoginPage = () => {
  const router = useRouter()
  const [loginFacebook] = useMutation(LOGIN_FACEBOOK)
  const [loginLocal] = useMutation(LOGIN)

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
    <motion.div variants={fadeInUp}>
      <Title level={4}>Đăng nhập</Title>

      <LoginForm />

      <Link href="/register">Đăng ký</Link>

      <Row gutter={[8, 8]}>
        <Col xs={24} sm={8}>
          <FacebookLogin
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <Button
                type="primary"
                block
                className="btn-login btn-login-facebook"
                icon={
                  <FaFacebookF color="#fff" style={{ marginRight: '5px' }} />
                }
                size="large"
                onClick={renderProps.onClick}
              >
                Facebook
              </Button>
            )}
          />
        </Col>

        <Col xs={24} sm={8}>
          <Button
            className="btn-login btn-login-github"
            block
            icon={<FaGithub color="#fff" style={{ marginRight: '5px' }} />}
            size="large"
          >
            Github
          </Button>
        </Col>

        <Col xs={24} sm={8}>
          <Button
            className="btn-login btn-login-google"
            block
            icon={<FaGoogle style={{ marginRight: '5px' }} />}
            size="large"
          >
            Google
          </Button>
        </Col>
      </Row>
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps()()

export default LoginPage
