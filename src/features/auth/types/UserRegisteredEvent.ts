import defineEvent, { Event } from '../../../bus/defineEvent';
import { UserRole } from '../types';

export type RawData = {
  email: string;
  password: string;
  role: UserRole;
};

export type UserRegisteredEvent = Event<RawData, 'UserRegisteredEvent'>;
export const UserRegisteredEvent = defineEvent<RawData, 'UserRegisteredEvent'>(
  'UserRegisteredEvent'
);
