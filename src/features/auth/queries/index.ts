import { Connection } from 'typeorm';
import * as QueryBus from '../../../bus/queryBus';

import currentUser, { CurrentUserQueryArgs } from './currentUser';

import createStore from './store';

export default function init(connection: Connection) {
  const store = createStore(connection);

  QueryBus.subscribe<CurrentUserQueryArgs>('currentUser', currentUser(store));
}
