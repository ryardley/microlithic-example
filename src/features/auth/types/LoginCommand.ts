import defineEvent, { Event } from '../../../bus/defineEvent';

type RawData = {
  email: string;
  password: string; // hashed and salted clientside eventually
  sid: string;
};

export type LoginCommand = Event<RawData, 'LoginCommand'>;
export const LoginCommand = defineEvent<RawData, 'LoginCommand'>(
  'LoginCommand'
);
