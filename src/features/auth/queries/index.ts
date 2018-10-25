import { Connection } from 'typeorm';
import { IBusEvent } from '../../../bus/IBusEvent';
import { dispatch, subscribe } from '../../../bus/QueryBus';
import currentUser from './handlers/currentUser';

import createStore from './store';
import { Store } from './types';

export default function init(connection: Connection) {
  const store: Store = createStore(connection);
  const context: Context = { store, dispatch };

  subscribe('CurrentUserRequest', currentUser(context));
}

export type Context = {
  store: Store;
  dispatch: ((a: IBusEvent) => void);
};
