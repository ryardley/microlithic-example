import { BusEvent, declareEvent } from './BusEvent';

export type TimeoutEvent = BusEvent<{
  type: 'TimeoutEvent';
}>;

export const TimeoutEvent = declareEvent<TimeoutEvent>('TimeoutEvent');
