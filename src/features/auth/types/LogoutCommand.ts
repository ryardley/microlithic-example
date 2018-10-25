import { CorrelatedData, Event } from '../../../bus/types';

type RawData = {
  sid: string;
};

export type LogoutCommand = Event<RawData, 'LogoutCommand'>;

export const LogoutCommand = (d: CorrelatedData<RawData>): LogoutCommand => ({
  ...d,
  type: 'LogoutCommand',
});
