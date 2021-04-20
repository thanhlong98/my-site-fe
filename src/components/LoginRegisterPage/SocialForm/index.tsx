import { useMutation } from '@apollo/client'
import { LOGIN_FACEBOOK } from '@graphql/mutations'
import { login } from '@store'
import { Button, Col, notification, Row } from 'antd'
import { useRouter } from 'next/router'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

export const SocialForm = () => {
  const [loginFacebook, { loading: loading1 }] = useMutation(LOGIN_FACEBOOK)
  const dispatch = useDispatch()

  const router = useRouter()

  const responseFacebook = async (response) => {
    try {
      const { data } = await loginFacebook({
        variables: {
          accessToken: response.accessToken,
        },
      })

      if (data) {
        notification.success({
          placement: 'bottomRight',
          duration: 3,
          message: 'Đăng nhập thành công',
        })

        dispatch(login())

        router.push('/')
      }
    } catch (error) {
      console.log(error)

      notification.error({
        placement: 'bottomRight',
        duration: 3,
        message: 'Đăng nhập facebook không thành công',
      })
    }
  }

  return (
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
              icon={<FaFacebookF color="#fff" style={{ marginRight: '5px' }} />}
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
  )
}
