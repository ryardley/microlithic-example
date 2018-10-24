import { Connection } from 'typeorm';
import * as CommandBus from '../../../bus/CommandBus';

import loginCommand from './handlers/login';
import logoutCommand from './handlers/logout';
import registerCommand from './handlers/register';
import createStore from './store';

export default function init(connection: Connection) {
  const store = createStore(connection);

  CommandBus.subscribe('LoginCommand', loginCommand(store));
  CommandBus.subscribe('LogoutCommand', logoutCommand());
  CommandBus.subscribe('RegisterCommand', registerCommand());
}
