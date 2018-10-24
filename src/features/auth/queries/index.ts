import { Connection } from 'typeorm';
import * as QueryBus from '../../../bus/QueryBus';

import currentUser from './handlers/currentUser';

import createStore from './store';

export default function init(connection: Connection) {
  const store = createStore(connection);

  QueryBus.subscribe('CurrentUserRequest', currentUser(store));
}
