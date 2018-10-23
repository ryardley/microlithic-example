import { Connection } from 'typeorm';
import * as CommandBus from '../../../bus/commandBus';

import loginCommand, { LoginCommandArgs } from './login';
import logoutCommand, { LogoutCommandArgs } from './logout';
import registerCommand, { RegisterCommandArgs } from './register';
import createStore from './store';

export default function init(connection: Connection) {
  const store = createStore(connection);

  CommandBus.subscribe<LoginCommandArgs>('login', loginCommand(store));
  CommandBus.subscribe<LogoutCommandArgs>('logout', logoutCommand());
  CommandBus.subscribe<RegisterCommandArgs>('register', registerCommand());
}
