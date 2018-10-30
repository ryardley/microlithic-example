import { BusEvent, declareEvent } from '../../../bus/BusEvent';

export type UserLoggedOutEvent = BusEvent<{
  type: 'UserLoggedOutEvent';
  sid: string;
}>;

export const UserLoggedOutEvent = declareEvent<UserLoggedOutEvent>(
  'UserLoggedOutEvent'
);
