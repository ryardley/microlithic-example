import * as bcrypt from 'bcryptjs';
import { dispatch } from '../../../../bus/eventbus';
import { UserRegisteredEvent } from '../../types';

import { RegisterCommand } from '../../types';

export default (/*store:Store*/) => async ({
  email,
  password,
  role
}: RegisterCommand) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  dispatch(
    UserRegisteredEvent({
      email,
      password: hashedPassword,
      role
    })
  );

  return true;
};
