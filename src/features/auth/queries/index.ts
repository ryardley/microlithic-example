import { Connection } from 'typeorm';
import { BaseEvent } from '../../../bus/BusEvent';
import QueryBus from '../../../bus/QueryBus';
import currentUser from './handlers/currentUser';

import createStore from './store';
import { Store } from './types';

export default function init(connection: Connection) {
  const store: Store = createStore(connection);
  const context: Context = { store, dispatch: QueryBus.dispatch };

  QueryBus.subscribe('CurrentUserRequest', currentUser(context));
}

export type Context = {
  store: Store;
  dispatch: ((a: BaseEvent) => void);
};
