import {gql} from '@apollo/client';

export const REGISTER_USER = gql`
  mutation AddUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $name: String
  ) {
    addUser(
      first_name: $firstName
      last_name: $lastName
      email: $email
      password: $password
      name: $name
    ) {
      id
      name
      username
      first_name
      last_name
      email
      password
    }
  }
`;

export const GET_VALIDATION = gql`
  query GetValidation($code: String!) {
    getValidation(code: $code) {
      message
      email
      password
      bool
    }
  }
`;
