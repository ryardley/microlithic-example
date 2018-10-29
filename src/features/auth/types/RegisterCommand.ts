import defineEvent, { Event } from '../../../bus/defineEvent';

type RawData = {
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export type RegisterCommand = Event<RawData, 'RegisterCommand'>;
export const RegisterCommand = defineEvent<RawData, 'RegisterCommand'>(
  'RegisterCommand'
);
