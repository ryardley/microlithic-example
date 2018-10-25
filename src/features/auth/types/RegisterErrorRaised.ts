import { CorrelatedData, Event } from '../../../bus/types';

type RawData = {
  email: string;
  errors: Array<'user_already_exists'>;
};

export type RegisterErrorRaised = Event<RawData, 'RegisterErrorRaised'>;

export const RegisterErrorRaised = (
  d: CorrelatedData<RawData>
): RegisterErrorRaised => ({
  ...d,
  type: 'RegisterErrorRaised'
});
