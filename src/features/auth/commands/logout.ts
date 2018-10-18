import { publish } from '../../../eventbus';
import UserLoggedOutEvent from '../sync/UserLoggedOutEvent';

export default async function logout(sid: string) {
  publish(UserLoggedOutEvent.symbol, new UserLoggedOutEvent(sid));

  return true;
}
