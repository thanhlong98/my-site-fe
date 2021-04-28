import { useRouter } from 'next/router'
import React from 'react'

const CVPerson: React.FC = () => {
  const { query } = useRouter()

  return <div>CV Persion {query['slug']}</div>
}

export default CVPerson
