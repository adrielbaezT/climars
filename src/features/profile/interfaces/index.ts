export interface IEditUser {
  id?: string;
  name?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface EditUserResponse {
  editUser: IEditUser;
}

export interface EditUserVars {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
}
