import { IBusEvent } from '../../../types';

export type UserRole = 'admin' | 'user';
export type UserToken = {
  id: string;
  role: UserRole;
};

export type AccessContext = {
  userToken?: UserToken;
  sid?: string;
};

export type Event<T, S> = IBusEvent &
  T & {
    type: S;
  };

export type CorrelatedData<D> = D & {
  correlationId?: string;
};

export * from './CurrentUserRequest';
export * from './CurrentUserResponse';
export * from './UserLoggedInEvent';
export * from './UserLoggedOutEvent';
export * from './UserRegisteredEvent';
export * from './LoginCommand';
export * from './LogoutCommand';
export * from './RegisterCommand';
