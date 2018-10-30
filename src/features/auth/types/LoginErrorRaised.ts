import { BusEvent, declareEvent } from '../../../bus/BusEvent';

export type LoginErrorRaised = BusEvent<{
  type: 'LoginErrorRaised';
  errors: Array<'invalid_password' | 'no_user_found'>;
  email: string;
  sid: string;
}>;

export const LoginErrorRaised = declareEvent<LoginErrorRaised>(
  'LoginErrorRaised'
);
