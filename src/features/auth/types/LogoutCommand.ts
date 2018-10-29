import defineEvent, { Event } from '../../../bus/defineEvent';

type RawData = {
  sid: string;
};

export type LogoutCommand = Event<RawData, 'LogoutCommand'>;
export const LogoutCommand = defineEvent<RawData, 'LogoutCommand'>(
  'LogoutCommand'
);
