export interface IRegisterUser {
  id?: number;
  name: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  language?: string;
  password?: string;
  code?: string;
}

export interface RegisterUserData {
  addUser: IRegisterUser;
}

export interface IRegisterUserVars {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name?: string;
}

export interface IGetValidation {
  message?: string;
  email?: string;
  password?: string;
  bool?: boolean;
}

export interface GetValidationData {
  getValidation: IGetValidation;
}

export interface IGetValidationVars {
  code: string;
}
