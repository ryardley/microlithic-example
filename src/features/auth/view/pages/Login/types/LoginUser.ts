/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUser
// ====================================================

export interface LoginUser_login {
  email: string;
}

export interface LoginUser {
  login: LoginUser_login | null;
}

export interface LoginUserVariables {
  email: string;
  password: string;
}
