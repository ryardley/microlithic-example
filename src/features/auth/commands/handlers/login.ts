import * as bcrypt from 'bcryptjs';
import { LoginCommand } from '../../types/LoginCommand';
import { LoginErrorRaised } from '../../types/LoginErrorRaised';
import { UserLoggedInEvent } from '../../types/UserLoggedInEvent';
import { Context } from '../index';

export default ({ store, dispatch }: Context) =>
  async function loginCommand({
    email,
    password,
    sid,
    correlationId
  }: LoginCommand) {
    const user = await store.findUserByEmail(email);

    if (!user) {
      await dispatch(
        LoginErrorRaised({
          correlationId,
          email,
          errors: ['no_user_found'],
          sid
        })
      );
      return;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      await dispatch(
        LoginErrorRaised({
          correlationId,
          email,
          errors: ['invalid_password'],
          sid
        })
      );
      return false;
    }

    // TODO:  eventually this will be converted to
    //        a JWT here so we can send on the event bus to know auth
    const userToken = {
      id: user.id,
      role: user.role
    };

    await dispatch(
      UserLoggedInEvent({
        correlationId,
        sid,
        userToken
      })
    );
  };
