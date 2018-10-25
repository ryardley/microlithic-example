import { CorrelatedData, Event } from '../../../bus/types';
import { UserRole } from '../types';

export type RawData = {
  email: string;
  password: string;
  role: UserRole;
};

export type UserRegisteredEvent = Event<RawData, 'UserRegisteredEvent'>;

export const UserRegisteredEvent = (
  d: CorrelatedData<RawData>
): UserRegisteredEvent => ({
  ...d,
  type: 'UserRegisteredEvent',
});
