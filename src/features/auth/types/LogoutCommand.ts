import { Event } from '../types';

type RawData = {
  sid: string;
};

export type LogoutCommand = Event<RawData, 'LogoutCommand'>;

export const LogoutCommand = (d: RawData): LogoutCommand => ({
  ...d,
  type: 'LogoutCommand'
});
