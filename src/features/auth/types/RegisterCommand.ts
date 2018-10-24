import { CorrelatedData, Event } from '../types';

type RawData = {
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export type RegisterCommand = Event<RawData, 'RegisterCommand'>;

export const RegisterCommand = (
  d: CorrelatedData<RawData>
): RegisterCommand => ({
  ...d,
  type: 'RegisterCommand'
});
