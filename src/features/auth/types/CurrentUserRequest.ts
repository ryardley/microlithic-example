import { CorrelatedData, Event } from '../../../bus/types';
import { UserToken } from '../types';

type RawData = {
  userToken: UserToken;
  id: string;
};

export type CurrentUserRequest = Event<RawData, 'CurrentUserRequest'>;

export const CurrentUserRequest = (
  d: CorrelatedData<RawData>
): CurrentUserRequest => ({
  ...d,
  type: 'CurrentUserRequest',
});
