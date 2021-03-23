import { Col, Row } from 'antd'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import './styles.less'

export const LoginRegisterLayout: React.FC = ({ children }) => {
  const router = useRouter()

  return (
    <Row className="login-register-page">
      <Col xs={0} sm={0} md={12}>
        <div className="login-register-img"></div>
      </Col>

      <Col xs={24} sm={24} md={12}>
        <Row justify="center" style={{ height: '100%' }}>
          <Col xs={24} md={22} lg={18}>
            <div className="login-register-container">
              <motion.div
                className="login-register-form"
                exit={{ opacity: 0 }}
                initial="initial"
                animate="animate"
              >
                <Link href="/">
                  <a className="logo">
                    <img src="/omg-large.png" />
                  </a>
                </Link>

                <div className="wrapper-form">{children}</div>
              </motion.div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
