import { MemoryStore } from 'express-session';
import * as EventBus from '../../../eventBus';
import UserLoggedInEvent from '../events/UserLoggedInEvent';
import UserLoggedOutEvent from '../events/UserLoggedOutEvent';

function getSession(
  st: MemoryStore,
  sid: string
): Promise<Express.SessionData | null> {
  return new Promise((res, rej) => {
    st.get(sid, (err, session) => {
      if (err) {
        rej(err);
      }

      session ? res(session) : res(null);
    });
  });
}

export default function createStore() {
  // pass config down from above
  const store = new MemoryStore();

  // UserLoggedInEvent
  EventBus.subscribe(
    UserLoggedInEvent.symbol,
    async (event: UserLoggedInEvent) => {
      const session = await getSession(store, event.sid);
      if (!session) {
        return;
      }

      store.set(event.sid, {
        ...session,
        userToken: event.userToken
      });
    }
  );

  // UserLoggedOutEvent
  EventBus.subscribe(
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

  return store;
}
