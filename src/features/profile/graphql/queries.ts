import {gql} from '@apollo/client';

export const EDIT_USER = gql`
  mutation EditUser(
    $name: String
    $firstName: String
    $lastName: String
    $editUserId: String
    $email: String
  ) {
    editUser(
      name: $name
      first_name: $firstName
      last_name: $lastName
      id: $editUserId
      email: $email
    ) {
      id
      name
      first_name
      last_name
      email
    }
  }
`;
