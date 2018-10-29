import correlatedEvent from '../../../../bus/correlatedEvents';
import QueryBus from '../../../../bus/QueryBus';
import { UserToken } from '../../types';
import { CurrentUserRequest } from '../../types/CurrentUserRequest';
import { CurrentUserResponse } from '../../types/CurrentUserResponse';
import { TimeoutError } from '../errors';

export default async (
  _: any,
  __: any,
  { userToken }: { userToken: UserToken }
) => {
  console.log('Routeing currentUser query....');
  const event = correlatedEvent(
    CurrentUserRequest({
      id: userToken && userToken.id,
      userToken,
    })
  );

  QueryBus.dispatch(event);

  const response = await QueryBus.waitForEvent<CurrentUserResponse>(
    event.correlationId,
    'CurrentUserResponse'
  );
  console.log('Received a response!');
  if (response.type === 'TimeoutEvent') {
    throw new TimeoutError();
  }

  return response.user;
};
