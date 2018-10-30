import { BusEvent, declareEvent } from '../../../bus/BusEvent';

export type CurrentUserResponse = BusEvent<{
  type: 'CurrentUserResponse';
  user?: {
    email: string;
  };
}>;

export const CurrentUserResponse = declareEvent<CurrentUserResponse>(
  'CurrentUserResponse'
);
