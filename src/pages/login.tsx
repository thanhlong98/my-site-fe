import { LoginForm, SocialForm } from '@components/LoginRegisterPage'
import { withServerSideProps } from '@hocs'
import { Typography } from 'antd'
import { motion, Variants } from 'framer-motion'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

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

  return (
    <motion.div variants={fadeInUp}>
      <Title level={4}>Đăng nhập</Title>

      <LoginForm />

      <div
        style={{
          margin: '10px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/forgotPassword">Quên mật khẩu?</Link>
        <Link href="/register">Bạn chưa có tài khoản?</Link>
      </div>
      <SocialForm />
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps()()

export default LoginPage
