import { BusEvent, declareEvent } from '../../../bus/BusEvent';

export type RegisterErrorRaised = BusEvent<{
  type: 'RegisterErrorRaised';
  email: string;
  errors: Array<'user_already_exists'>;
}>;

export const RegisterErrorRaised = declareEvent<RegisterErrorRaised>(
  'RegisterErrorRaised'
);
