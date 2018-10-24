import { CorrelatedData, Event } from '../types';

type RawData = {
  user?: {
    email: string;
  };
};

export type CurrentUserResponse = Event<RawData, 'CurrentUserResponse'>;

export const CurrentUserResponse = (
  d: CorrelatedData<RawData>
): CurrentUserResponse => ({
  ...d,
  type: 'CurrentUserResponse'
});
