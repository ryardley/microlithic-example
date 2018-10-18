export type UserRole = 'admin' | 'user';
export type UserToken = {
  id: string;
  role: UserRole;
};

export type DoLoginFn = (token: UserToken) => void;
export type DoLogoutFn = () => void;

export type AccessContext = {
  userToken?: UserToken;
  sid?: string;
};

export type UserLoggedInEvent = {
  userId: string;
  sid: string;
};
