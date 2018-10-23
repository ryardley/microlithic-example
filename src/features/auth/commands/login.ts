import * as bcrypt from 'bcryptjs';
import { publish } from '../../../eventBus';
import UserLoggedInEvent from '../events/UserLoggedInEvent';
import { Store } from './types';

export type LoginCommandArgs = {
  email: string;
  password: string; // hashed and salted clientside eventually
  sid: string;
};

export default (store: Store) => async ({
  email,
  password,
  sid
}: LoginCommandArgs) => {
  console.log('Login function running!!');
  const user = await store.findUserByEmail(email);
  if (!user) {
    console.log('No User found: ' + email); // TODO: dispatch event
    return false;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    console.log('User not valid: ' + email); // TODO: dispatch event
    return false;
  }

  // TODO:  eventually this will be converted to
  //        a JWT here so we can send on the event bus to know auth
  const verifiedUser = {
    id: user.id,
    role: user.role
  };

  return await publish(
    UserLoggedInEvent.symbol,
    new UserLoggedInEvent(verifiedUser, sid)
  );
};
