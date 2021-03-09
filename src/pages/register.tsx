import Container from '@ui/Container'
import { withServerSideProps } from '@hocs'
import { MainLayout } from '@layout'
import { GetServerSideProps } from 'next'
import React from 'react'

const RegisterPage = () => {
  return (
    <MainLayout hasFooter={false}>
      <Container>
        <h3>Register page</h3>
        <div>
          <form>
            <input name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </Container>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withServerSideProps()()

export default RegisterPage
