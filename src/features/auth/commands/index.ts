import { Connection } from 'typeorm';
import * as CommandBus from '../../../bus/commandBus';

import { LoginCommand, LogoutCommand, RegisterCommand } from '../types';

import loginCommand from './handlers/login';
import logoutCommand from './handlers/logout';
import registerCommand from './handlers/register';
import createStore from './store';

export default function init(connection: Connection) {
  const store = createStore(connection);

  CommandBus.subscribe<LoginCommand>('LoginCommand', loginCommand(store));
  CommandBus.subscribe<LogoutCommand>('LogoutCommand', logoutCommand());
  CommandBus.subscribe<RegisterCommand>('RegisterCommand', registerCommand());
}
