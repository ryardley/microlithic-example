import defineEvent, { Event } from '../../../bus/defineEvent';

type RawData = {
  sid: string;
};

export type UserLoggedOutEvent = Event<RawData, 'UserLoggedOutEvent'>;
export const UserLoggedOutEvent = defineEvent<RawData, 'UserLoggedOutEvent'>(
  'UserLoggedOutEvent'
);
