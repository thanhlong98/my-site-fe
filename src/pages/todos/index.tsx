import { withServerSideProps } from '@hocs'
import { MasterLayout } from '@layout'
import { GetServerSideProps } from 'next'
import React from 'react'

const TodosPage = () => {
  return <MasterLayout hasFooter={false}>Hello World</MasterLayout>
}

export const getServerSideProps: GetServerSideProps = withServerSideProps({
  auth: true,
})()

export default TodosPage
