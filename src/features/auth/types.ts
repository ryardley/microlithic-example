export type UserRole = 'admin' | 'user';
export type UserToken = {
  id: string;
  role: UserRole;
};

export type AccessContext = {
  userToken?: UserToken;
  sid?: string;
};

export type UserLoggedInEvent = {
  type: 'UserLoggedInEvent';
  userToken: UserToken;
  sid: string;
};

export type UserLoggedOutEvent = {
  type: 'UserLoggedOutEvent';
  sid: string;
};

export type UserRegisteredEvent = {
  type: 'UserRegisteredEvent';
  email: string;
  password: string;
  role: UserRole;
};

export type LoginCommand = {
  type: 'LoginCommand';
  email: string;
  password: string; // hashed and salted clientside eventually
  sid: string;
};

export type LogoutCommand = {
  type: 'LogoutCommand';
  sid: string;
};

export type RegisterCommand = {
  type: 'RegisterCommand';
  email: string;
  password: string;
  role: 'admin' | 'user';
};
