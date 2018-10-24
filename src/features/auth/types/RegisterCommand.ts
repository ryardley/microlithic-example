import { Event } from '../types';

type RawData = {
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export type RegisterCommand = Event<RawData, 'RegisterCommand'>;

export const RegisterCommand = (d: RawData): RegisterCommand => ({
  ...d,
  type: 'RegisterCommand'
});
