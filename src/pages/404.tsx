import Container from '@components/Container'
import { NextPage } from 'next'

const Custom404: NextPage<{}> = () => {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
    </Container>
  )
}

export default Custom404
