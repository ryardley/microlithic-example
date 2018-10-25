import { CorrelatedData, Event } from './types';

type RawData = {};

export type TimeoutEvent = Event<RawData, 'TimeoutEvent'>;

export const TimeoutEvent = (d: CorrelatedData<RawData>): TimeoutEvent => ({
  ...d,
  type: 'TimeoutEvent',
});
