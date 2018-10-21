import * as bus from '../../../eventbus';
import User from '../models/User';

import UserRegisteredEvent from '../events/UserRegisteredEvent';

export default async function init() {
  bus.subscribe(
    UserRegisteredEvent.symbol,
    async (event: UserRegisteredEvent) => {
      console.log(`Creating user: ${event.email}`);
      await User.create({
        email: event.email,
        password: event.password,
        role: event.role
      }).save();
    }
  );
}
