import { MemoryStore } from 'express-session';
import * as bus from '../../../eventbus';
import User from '../models/User';
import UserLoggedInEvent from './UserLoggedInEvent';
import UserLoggedOutEvent from './UserLoggedOutEvent';
import UserRegisteredEvent from './UserRegisteredEvent';

function getSession(
  store: MemoryStore,
  sid: string
): Promise<Express.SessionData | null> {
  return new Promise((res, rej) => {
    store.get(sid, (err, session) => {
      if (err) {
        rej(err);
      }

      session ? res(session) : res(null);
    });
  });
}

function handleEvents(store: MemoryStore) {
  // UserLoggedInEvent
  bus.subscribe(UserLoggedInEvent.symbol, async (event: UserLoggedInEvent) => {
    const session = await getSession(store, event.sid);

    if (!session) {
      return;
    }

    store.set(event.sid, {
      ...session,
      userToken: event.userToken
    });
  });

  // UserLoggedOutEvent
  bus.subscribe(
    UserLoggedOutEvent.symbol,
    async (event: UserLoggedOutEvent) => {
      const session = await getSession(store, event.sid);

      if (!session) {
        return;
      }

      store.set(event.sid, {
        ...session,
        userToken: undefined
      });
    }
  );
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

const sessionCache = new MemoryStore();
handleEvents(sessionCache);
export default sessionCache;
