import { useMutation } from '@apollo/client'
import { LOGIN } from '@graphql/mutations'
import { Button, Form, Input, notification } from 'antd'
import React from 'react'

export const LoginForm = () => {
  const [form] = Form.useForm()
  const [loginLocal, { loading }] = useMutation(LOGIN)

  const handleSubmit = async (values) => {
    try {
      await loginLocal({ variables: { ...values } })

      notification.success({
        placement: 'bottomRight',
        duration: 3,
        message: 'Đăng nhập thành công',
      })
      window.location.href = '/'
    } catch (error) {
      console.log(error)
      notification.error({
        placement: 'bottomRight',
        duration: 3,
        message: 'Đăng nhập thất bại',
      })
    }
  }

  return (
    <Form form={form} name="login" layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Bạn chưa nhập mật email' }]}
      >
        <Input size="large" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu' }]}
      >
        <Input.Password size="large" placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          size="large"
          type="primary"
          block
          loading={loading}
          htmlType="submit"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}
