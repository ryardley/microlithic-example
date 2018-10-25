import { CorrelatedData, Event } from '../../../bus/types';

type RawData = {
  errors: Array<'invalid_password' | 'no_user_found'>;
  email: string;
  sid: string;
};

export type LoginErrorRaised = Event<RawData, 'LoginErrorRaised'>;

export const LoginErrorRaised = (
  d: CorrelatedData<RawData>
): LoginErrorRaised => ({ ...d, type: 'LoginErrorRaised' });
