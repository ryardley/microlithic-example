export type UserRole = 'admin' | 'user';
export type UserToken = {
  id: string;
  role: UserRole;
};

export type AccessContext = {
  userToken?: UserToken;
  sid?: string;
};
