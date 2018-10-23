import * as bcrypt from 'bcryptjs';
import { publish } from '../../../../bus/eventbus';
import { UserRegisteredEvent } from '../../types';

import { RegisterCommand } from '../../types';

export default (/*store:Store*/) => async ({
  email,
  password,
  role
}: RegisterCommand) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  publish<UserRegisteredEvent>({
    email,
    password: hashedPassword,
    role,
    type: 'UserRegisteredEvent'
  });

  return true;
};
