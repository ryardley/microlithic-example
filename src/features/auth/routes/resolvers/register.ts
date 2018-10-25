import * as CommandBus from '../../../../bus/CommandBus';
import correlatedEvent from '../../../../bus/correlatedEvents';
import * as EventBus from '../../../../bus/EventBus';
import { UserRole } from '../../types';
import { RegisterCommand } from '../../types/RegisterCommand';
import { RegisterErrorRaised } from '../../types/RegisterErrorRaised';
import { UserRegisteredEvent } from '../../types/UserRegisteredEvent';
import { UserAlreadyExists } from '../errors';

type InputArgs = {
  email: string;
  password: string;
  role: UserRole;
};
export default async (_: any, { email, password, role }: InputArgs) => {
  const event = correlatedEvent(
    RegisterCommand({
      email,
      password,
      role,
    })
  );

  CommandBus.dispatch(event);

  const answer = await EventBus.waitForEvent<
    UserRegisteredEvent,
    RegisterErrorRaised
  >(event.correlationId, ['UserRegisteredEvent', 'RegisterErrorRaised']);

  if (
    answer.type === 'RegisterErrorRaised' &&
    answer.errors.includes('user_already_exists')
  ) {
    throw new UserAlreadyExists();
  }

  return true;
};
