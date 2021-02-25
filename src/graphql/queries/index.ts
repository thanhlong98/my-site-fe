import { gql } from '@apollo/client'

export const HELLO = gql`
  query {
    hello
  }
`

export const ME = gql`
  query {
    me {
      email
      avatar
      gender
      firstName
      lastName
    }
  }
`
