export type UserToken = {
  id: string;
  role: 'admin' | 'user';
};

export type DoLoginFn = (token: UserToken) => void;
export type DoLogoutFn = () => void;

export type AccessContext = {
  userToken?: UserToken;
  doLogin: DoLoginFn;
  doLogout: DoLogoutFn;
};
