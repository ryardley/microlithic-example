import * as bcrypt from 'bcryptjs';
import { RegisterCommand } from '../../types/RegisterCommand';
import { RegisterErrorRaised } from '../../types/RegisterErrorRaised';
import { UserRegisteredEvent } from '../../types/UserRegisteredEvent';
import { Context } from '../index';

export default ({ store, dispatch }: Context) => async ({
  email,
  password,
  role,
  correlationId
}: RegisterCommand) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await store.findUserByEmail(email);

  if (user) {
    return await dispatch(
      RegisterErrorRaised({
        correlationId,
        email,
        errors: ['user_already_exists']
      })
    );
  }

  dispatch(
    UserRegisteredEvent({
      correlationId,
      email,
      password: hashedPassword,
      role
    })
  );
};
