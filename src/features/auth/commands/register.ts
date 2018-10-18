import * as bcrypt from 'bcryptjs';
import { publish } from '../../../eventbus';
import UserRegisteredEvent from '../sync/UserRegisteredEvent';

export default async function register(
  email: string,
  password: string,
  role: 'admin' | 'user'
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  publish(
    UserRegisteredEvent.symbol,
    new UserRegisteredEvent(email, hashedPassword, role)
  );

  return true;
}
