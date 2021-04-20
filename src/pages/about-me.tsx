import { withServerSideProps } from '@hocs'
import { useAuth } from '@hooks'
import { MasterLayout } from '@layout'
import '@styles/profile.less'
import { Col, Image, Row, Switch } from 'antd'
import { GetServerSideProps, NextPage } from 'next'
import { FaPen } from 'react-icons/fa'

type Props = {
  user: any
}

const AbountMePage: NextPage<Props> = () => {
  const { me } = useAuth()

  const handleChangePublic = (checked) => {
    console.log(checked)
  }

  return (
    <MasterLayout hasFooter={false}>
      <section className="section-one">
        <div className="container">
          <div style={{ width: '100%' }}>
            <div className="profile-setting">
              <span>Public</span>
              <Switch onChange={handleChangePublic} />
            </div>

            <Row gutter={8}>
              <Col xs={24} md={8}>
                <div className="profile__card profile__user-info">
                  <div className="profile__avatar">
                    <Image src={me?.avatar} />
                    <div className="profile__avatar-edit">
                      <FaPen size={18} />
                    </div>
                  </div>

                  <h3 className="fullName">
                    {me?.firstName + ' ' + me?.lastName}
                  </h3>

                  <p className="">Front End Developer</p>

                  <p className="">Quang Nam, Viet Nam</p>
                </div>

                <div className="profile__card profile__user-social">
                  <div>
                    <span>Website</span>
                    <span>Website</span>
                  </div>
                  <div>
                    <span>Facebook</span>
                    <span>Website</span>
                  </div>
                  <div>
                    <span>Gmail</span>
                    <span>Website</span>
                  </div>
                  <div>
                    <span>Github</span>
                    <span>Website</span>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={16}></Col>
            </Row>
          </div>
        </div>
      </section>
    </MasterLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps()()

export default AbountMePage
