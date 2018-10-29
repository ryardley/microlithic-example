import CommandBus from '../../../../bus/CommandBus';
import EventBus from '../../../../bus/EventBus';

import { LoginCommand } from '../../types/LoginCommand';
import { LoginErrorRaised } from '../../types/LoginErrorRaised';

import { UserLoggedInEvent } from '../../types/UserLoggedInEvent';

import { InvalidCredentialsError, NoUserFoundError } from '../errors';

type InputArgs = { email: string; password: string };
type InputContext = { sid: string };

export default async (
  _: any,
  { email, password }: InputArgs,
  { sid }: InputContext
) => {
  // Create the command event with a correlationId
  const event = LoginCommand.correlated({
    email,
    password,
    sid,
  });

  // Dispatch it
  CommandBus.dispatch(event);

  // This will wait for the corresponding resultant event
  const answer = await EventBus.waitForEvent<
    UserLoggedInEvent,
    LoginErrorRaised
  >(event.correlationId, ['UserLoggedInEvent', 'LoginErrorRaised']);

  if (answer.type === 'LoginErrorRaised') {
    if (answer.errors.includes('no_user_found')) {
      throw new NoUserFoundError();
    }
    if (answer.errors.includes('invalid_password')) {
      throw new InvalidCredentialsError();
    }
  }

  return true;
};
