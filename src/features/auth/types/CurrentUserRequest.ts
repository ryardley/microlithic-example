import { BusEvent, declareEvent } from '../../../bus/BusEvent';
import { UserToken } from '../types';

export type CurrentUserRequest = BusEvent<{
  type: 'CurrentUserRequest';
  userToken: UserToken;
  id: string;
}>;

export const CurrentUserRequest = declareEvent<CurrentUserRequest>(
  'CurrentUserRequest'
);
