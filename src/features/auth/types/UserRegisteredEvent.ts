import { BusEvent, declareEvent } from '../../../bus/BusEvent';
import { UserRole } from '../types';

export type UserRegisteredEvent = BusEvent<{
  type: 'UserRegisteredEvent';
  email: string;
  password: string;
  role: UserRole;
}>;

export const UserRegisteredEvent = declareEvent<UserRegisteredEvent>(
  'UserRegisteredEvent'
);
