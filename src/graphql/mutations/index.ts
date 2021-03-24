import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      accessToken
    }
  }
`

export const REGISTER = gql`
  mutation($input: CreateUserInput!) {
    register(input: $input) {
      accessToken
    }
  }
`

export const LOGIN_FACEBOOK = gql`
  mutation($accessToken: String!) {
    loginFacebook(accessToken: $accessToken) {
      accessToken
    }
  }
`
