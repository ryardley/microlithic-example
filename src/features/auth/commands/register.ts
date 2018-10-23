import * as bcrypt from 'bcryptjs';
import { publish } from '../../../bus/eventbus';
import UserRegisteredEvent from '../events/UserRegisteredEvent';

// import {Store} from './types';

export type RegisterCommandArgs = {
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export default (/*store:Store*/) => async ({
  email,
  password,
  role
}: RegisterCommandArgs) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  publish(
    UserRegisteredEvent.symbol,
    new UserRegisteredEvent(email, hashedPassword, role)
  );

  return true;
};
