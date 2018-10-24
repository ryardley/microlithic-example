import * as bcrypt from 'bcryptjs';
import { dispatch } from '../../../../bus/EventBus';
import { UserLoggedInEvent } from '../../types';
import { Store } from '../types';

import { LoginCommand } from '../../types';

export default (store: Store) =>
  async function loginCommand({ email, password, sid }: LoginCommand) {
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
    const userToken = {
      id: user.id,
      role: user.role
    };

    return await dispatch(
      UserLoggedInEvent({
        sid,
        userToken
      })
    );
  };
