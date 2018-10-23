import { Connection } from 'typeorm';
import * as CommandBus from '../../../bus/commandBus';

import { LoginCommand, LogoutCommand, RegisterCommand } from '../types';

import loginCommand from './login';
import logoutCommand from './logout';
import registerCommand from './register';
import createStore from './store';

export default function init(connection: Connection) {
  const store = createStore(connection);

  CommandBus.subscribe<LoginCommand>('LoginCommand', loginCommand(store));
  CommandBus.subscribe<LogoutCommand>('LogoutCommand', logoutCommand());
  CommandBus.subscribe<RegisterCommand>('RegisterCommand', registerCommand());
}
