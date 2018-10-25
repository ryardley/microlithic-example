import { CorrelatedData, Event } from '../../../bus/types';

type RawData = {
  sid: string;
};

export type UserLoggedOutEvent = Event<RawData, 'UserLoggedOutEvent'>;

export const UserLoggedOutEvent = (
  d: CorrelatedData<RawData>
): UserLoggedOutEvent => ({
  ...d,
  type: 'UserLoggedOutEvent',
});
