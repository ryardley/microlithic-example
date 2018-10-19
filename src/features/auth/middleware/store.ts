import { MemoryStore } from 'express-session';
import * as bus from '../../../eventbus';
import UserLoggedInEvent from '../events/UserLoggedInEvent';
import UserLoggedOutEvent from '../events/UserLoggedOutEvent';

const store = new MemoryStore();

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
bus.subscribe(UserLoggedOutEvent.symbol, async (event: UserLoggedOutEvent) => {
  const session = await getSession(store, event.sid);

  if (!session) {
    return;
  }

  store.set(event.sid, {
    ...session,
    userToken: undefined
  });
});

export default store;
