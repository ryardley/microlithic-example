import defineEvent, { Event } from '../../../bus/defineEvent';

type RawData = {
  user?: {
    email: string;
  };
};

export type CurrentUserResponse = Event<RawData, 'CurrentUserResponse'>;
export const CurrentUserResponse = defineEvent<RawData, 'CurrentUserResponse'>(
  'CurrentUserResponse'
);
