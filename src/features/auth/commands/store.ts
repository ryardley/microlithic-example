import * as bus from '../../../eventbus';
import UserRegisteredEvent from '../events/UserRegisteredEvent';

import User from '../models/User';
export async function findUserByEmail(email: string) {
  return User.findOne({ where: { email } });
}

bus.subscribe(
  UserRegisteredEvent.symbol,
  async (event: UserRegisteredEvent) => {
    await User.create({
      email: event.email,
      password: event.password,
      role: event.role
    }).save();
  }
);
