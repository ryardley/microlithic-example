import { Connector, createEventEmitter } from 'rxmsg';

import configureDispatch from './dispatch';
import { IBusEvent } from './IBusEvent';
import configureSubscribe from './subscribe';
import configureWaitForEvent from './waitForEvent';

export function createMessageBus<P extends IBusEvent, Q extends IBusEvent>(
  connector: Connector<{ to: any; body: P }, { to: any; body: Q }>
) {
  const emitter = createEventEmitter(connector);
  const dispatch = configureDispatch(emitter);
  const subscribe = configureSubscribe(emitter);
  const waitForEvent = configureWaitForEvent(subscribe);
  return {
    dispatch,
    subscribe,
    waitForEvent,
  };
}
