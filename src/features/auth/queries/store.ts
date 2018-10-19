import * as bus from '../../../eventbus';
import User from '../models/User';

import UserRegisteredEvent from '../events/UserRegisteredEvent';

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
