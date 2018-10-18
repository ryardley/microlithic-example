import * as bcrypt from 'bcryptjs';
import { publish } from '../../../eventbus';
import UserLoggedInEvent from '../store/UserLoggedInEvent';
import findUserByEmail from './data/findUserByEmail';

export default async function login(
  email: string,
  password: string,
  sid: string
) {
  const user = await findUserByEmail(email);
  if (!user) {
    console.log('No User found: ' + email);
    return false;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    console.log('User not valid: ' + email);
    return false;
  }

  // TODO:  eventually this will be converted to
  //        a JWT here so we can send on the event bus to know auth
  const verifiedUser = {
    id: user.id,
    role: user.role
  };

  publish(UserLoggedInEvent.symbol, new UserLoggedInEvent(verifiedUser, sid));

  return true;
}
