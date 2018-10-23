import { publish } from '../../../eventBus';
import UserLoggedOutEvent from '../events/UserLoggedOutEvent';

export type LogoutCommandArgs = { sid: string };

export default () => async ({ sid }: LogoutCommandArgs) => {
  publish(UserLoggedOutEvent.symbol, new UserLoggedOutEvent(sid));

  return true;
};
