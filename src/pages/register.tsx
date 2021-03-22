import { RegisterForm } from '@components/RegisterPage'
import { withServerSideProps } from '@hocs'
import { MainLayout } from '@layout'
import { Col, Row } from 'antd'
import { GetServerSideProps } from 'next'
import React from 'react'
import { Typography } from 'antd'
import Link from 'next/link'

const { Title } = Typography

const RegisterPage = () => {
  return (
    <MainLayout hasHeader={false} hasFooter={false}>
      <Row className="register-page">
        <Col xs={0} sm={0} md={12}>
          <div className="register-img"></div>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Row justify="center" style={{ height: '100%' }}>
            <Col xs={24} md={22} lg={18}>
              <div className="register-container">
                <div className="wrapper-form">
                  <Link href="/">
                    <a className="logo">
                      <img src="/omg-large.png" />
                    </a>
                  </Link>

                  <Title level={4}>Đăng ký</Title>

                  <RegisterForm />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps()()

export default RegisterPage
