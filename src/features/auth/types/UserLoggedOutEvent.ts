import { Event } from '../types';

type RawData = {
  sid: string;
};

export type UserLoggedOutEvent = Event<RawData, 'UserLoggedOutEvent'>;

export const UserLoggedOutEvent = (d: RawData): UserLoggedOutEvent => ({
  ...d,
  type: 'UserLoggedOutEvent'
});
