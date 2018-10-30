import { Connector, createEventEmitter } from 'rxmsg';

import { BaseEvent } from './BusEvent';
import configureDispatch from './dispatch';
import configureSubscribe from './subscribe';
import configureWaitForEvent from './waitForEvent';

export function createMessageBus<P extends BaseEvent, Q extends BaseEvent>(
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
