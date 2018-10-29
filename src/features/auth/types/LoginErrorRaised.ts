import defineEvent, { Event } from '../../../bus/defineEvent';

type RawData = {
  errors: Array<'invalid_password' | 'no_user_found'>;
  email: string;
  sid: string;
};

export type LoginErrorRaised = Event<RawData, 'LoginErrorRaised'>;
export const LoginErrorRaised = defineEvent<RawData, 'LoginErrorRaised'>(
  'LoginErrorRaised'
);
