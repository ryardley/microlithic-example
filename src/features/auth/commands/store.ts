import { Connection } from 'typeorm';
import * as EventBus from '../../../bus/EventBus';
import User from '../models/User';
import { UserRegisteredEvent } from '../types';
import { Store } from './types';

export default function createStore(connection: Connection): Store {
  const UserRepo = connection.getRepository(User);

  EventBus.subscribe(
    'UserRegisteredEvent',
    async ({ email, password, role }: UserRegisteredEvent) => {
      try {
        const user = new User();
        user.email = email;
        user.password = password;
        user.role = role;
        await UserRepo.save(user);
      } catch (e) {
        console.log(e);
      }
    }
  );

  return {
    findUserByEmail(email: string) {
      return UserRepo.findOne({ where: { email } });
    }
  };
}
