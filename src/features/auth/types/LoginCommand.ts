import { Event } from '../types';

type RawData = {
  email: string;
  password: string; // hashed and salted clientside eventually
  sid: string;
};

export type LoginCommand = Event<RawData, 'LoginCommand'>;

export const LoginCommand = (d: RawData): LoginCommand => ({
  ...d,
  type: 'LoginCommand'
});