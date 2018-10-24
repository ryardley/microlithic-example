import { CorrelatedData, Event, UserToken } from '../types';

type RawData = {
  userToken: UserToken;
  sid: string;
};

export type UserLoggedInEvent = Event<RawData, 'UserLoggedInEvent'>;

export const UserLoggedInEvent = (
  d: CorrelatedData<RawData>
): UserLoggedInEvent => ({
  ...d,
  type: 'UserLoggedInEvent'
});
