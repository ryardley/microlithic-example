// import { CorrelatedData, Event } from '../../../bus/types';
import { UserToken } from '../types';

import defineEvent, { Event } from '../../../bus/defineEvent';

type RawData = {
  userToken: UserToken;
  id: string;
};

export type CurrentUserRequest = Event<RawData, 'CurrentUserRequest'>;
export const CurrentUserRequest = defineEvent<RawData, 'CurrentUserRequest'>(
  'CurrentUserRequest'
);
