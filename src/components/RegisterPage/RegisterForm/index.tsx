import { useMutation } from '@apollo/client'
import { REGISTER } from '@graphql/mutations'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

const { Option } = Select

export const RegisterForm = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [reigster, { loading }] = useMutation(REGISTER)

  const handleSubmit = async (values) => {
    try {
      delete values.rePassword
      delete values.yearOfBirth

      const { data, errors } = await reigster({
        variables: {
          input: values,
        },
      })

      if (data) {
        router.push('/login')
      }
    } catch (errors) {
      errors.graphQLErrors.forEach((error) => {
        if (error.extensions.code === 'BAD_USER_INPUT') {
          form.setFields(
            error.extensions.fields.map((errorInput) => ({
              name: errorInput.name,
              errors: errorInput.message,
            }))
          )
        }
      })
    }
  }

  return (
    <Form form={form} name="register" layout="vertical" onFinish={handleSubmit}>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Bạn chưa nhập họ',
            },
          ]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            marginRight: '8px',
          }}
        >
          <Input size="large" placeholder="Họ" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Bạn chưa nhập tên',
            },
          ]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            marginLeft: '8px',
          }}
        >
          <Input size="large" placeholder="Tên" />
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Bạn chưa nhập mật email' },
          {
            type: 'email',
            message: 'Đây không phải email',
          },
        ]}
      >
        <Input size="large" placeholder="Email" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="yearOfBirth"
          rules={[{ required: true, message: 'Bạn chưa chọn năm sinh' }]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            marginRight: '8px',
          }}
        >
          <DatePicker
            style={{ width: '100%' }}
            size="large"
            placeholder="Năm sinh"
            picker="year"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[{ required: true, message: 'Bạn chưa chọn giới tính' }]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            marginLeft: '8px',
          }}
        >
          <Select size="large" placeholder="Giới tính">
            <Option value="MALE">Nam</Option>
            <Option value="FEMAKE">Nữ</Option>
            <Option value="OTHER">Khác</Option>
          </Select>
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Bạn chưa nhập mật khẩu' },
          { min: 6, message: 'Mật khẩu ít nhất 6 ký tự' },
        ]}
      >
        <Input.Password size="large" placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item
        name="rePassword"
        rules={[
          { required: true, message: 'Bạn chưa nhập mật khẩu xác nhận' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Mật khẩu không trùng khớp'))
            },
          }),
        ]}
      >
        <Input.Password size="large" placeholder="Xác nhận mật khẩu" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          size="large"
          type="primary"
          block
          loading={loading}
          htmlType="submit"
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  )
}
