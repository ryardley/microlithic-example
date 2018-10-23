import { Event, UserRole } from '../types';

export type RawData = {
  email: string;
  password: string;
  role: UserRole;
};

export type UserRegisteredEvent = Event<RawData, 'UserRegisteredEvent'>;

export const UserRegisteredEvent = (d: RawData): UserRegisteredEvent => ({
  ...d,
  type: 'UserRegisteredEvent'
});
