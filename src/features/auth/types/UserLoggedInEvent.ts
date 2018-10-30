import { BusEvent, declareEvent } from '../../../bus/BusEvent';
import { UserToken } from '../types';

export type UserLoggedInEvent = BusEvent<{
  type: 'UserLoggedInEvent';
  userToken: UserToken;
  sid: string;
}>;

export const UserLoggedInEvent = declareEvent<UserLoggedInEvent>(
  'UserLoggedInEvent'
);
