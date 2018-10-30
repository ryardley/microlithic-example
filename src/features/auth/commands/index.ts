import { Connection } from 'typeorm';
import { BaseEvent } from '../../../bus/BusEvent';
import CommandBus from '../../../bus/CommandBus';
import EventBus from '../../../bus/EventBus';
import loginCommand from './handlers/login';
import logoutCommand from './handlers/logout';
import registerCommand from './handlers/register';
import createStore from './store';
import { Store } from './types';

export default function init(connection: Connection) {
  const store = createStore(connection);
  const context: Context = { store, dispatch: EventBus.dispatch };

  CommandBus.subscribe('LoginCommand', loginCommand(context));
  CommandBus.subscribe('LogoutCommand', logoutCommand(context));
  CommandBus.subscribe('RegisterCommand', registerCommand(context));
}

export type Context = {
  store: Store;
  dispatch: ((a: BaseEvent) => void);
};
