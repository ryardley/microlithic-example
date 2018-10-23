import { IBusEvent } from '../../types';

export type UserRole = 'admin' | 'user';
export type UserToken = {
  id: string;
  role: UserRole;
};

export type AccessContext = {
  userToken?: UserToken;
  sid?: string;
};

export type UserLoggedInEvent = IBusEvent & {
  kind: 'UserLoggedInEvent';
  userToken: UserToken;
  sid: string;
};

export type UserLoggedOutEvent = IBusEvent & {
  kind: 'UserLoggedOutEvent';
  sid: string;
};

export type UserRegisteredEvent = IBusEvent & {
  kind: 'UserRegisteredEvent';
  email: string;
  password: string;
  role: UserRole;
};

export type LoginCommand = {
  kind: 'LoginCommand';
  email: string;
  password: string; // hashed and salted clientside eventually
  sid: string;
};

export type LogoutCommand = {
  kind: 'LogoutCommand';
  sid: string;
};

export type RegisterCommand = {
  kind: 'RegisterCommand';
  email: string;
  password: string;
  role: 'admin' | 'user';
};
