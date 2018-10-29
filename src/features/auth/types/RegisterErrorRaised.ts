import defineEvent, { Event } from '../../../bus/defineEvent';

type RawData = {
  email: string;
  errors: Array<'user_already_exists'>;
};

export type RegisterErrorRaised = Event<RawData, 'RegisterErrorRaised'>;
export const RegisterErrorRaised = defineEvent<RawData, 'RegisterErrorRaised'>(
  'RegisterErrorRaised'
);
