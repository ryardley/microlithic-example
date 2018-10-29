import defineEvent, { Event } from '../../../bus/defineEvent';
import { UserToken } from '../types';

type RawData = {
  userToken: UserToken;
  sid: string;
};

export type UserLoggedInEvent = Event<RawData, 'UserLoggedInEvent'>;
export const UserLoggedInEvent = defineEvent<RawData, 'UserLoggedInEvent'>(
  'UserLoggedInEvent'
);
