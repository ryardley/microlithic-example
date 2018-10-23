import { Connection } from 'typeorm';
import * as EventBus from '../../../eventBus';
import UserRegisteredEvent from '../events/UserRegisteredEvent';
import User from '../models/User';
import { Store } from './types';

export default function createStore(connection: Connection): Store {
  const userRepo = connection.getRepository(User);

  EventBus.subscribe(
    UserRegisteredEvent.symbol,
    async ({ email, password, role }: UserRegisteredEvent) => {
      await userRepo.create({ email, password, role });
    }
  );

  return {
    findUserById(id: string) {
      return userRepo.findOne(id);
    }
  };
}
