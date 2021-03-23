import { RegisterForm } from '@components/RegisterPage'
import { withServerSideProps } from '@hocs'
import { Typography } from 'antd'
import { motion, Variants } from 'framer-motion'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
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

const RegisterPage = () => {
  return (
    <motion.div variants={fadeInUp}>
      <Title level={4}>Đăng ký</Title>

      <RegisterForm />

      <Link href="/login">Đăng nhập</Link>
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps()()

export default RegisterPage
