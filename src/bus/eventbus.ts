import { createEventEmitter } from 'rxmsg';
import { createLoopbackConnector } from 'rxmsg/loopback';
import { IBusEvent } from '../types';

const emitter = createEventEmitter(createLoopbackConnector());

export async function publish<T extends IBusEvent>(event: T) {
  const eventName = event.kind;
  console.log(JSON.stringify({ eventName, payload: event }));
  emitter.emit(eventName, event);
  return true; // is ack
}

export function subscribe<T extends IBusEvent>(
  eventName: T['kind'],
  callback: (payload: T) => any
) {
  console.log({ subscribeTo: { eventName } });
  emitter.on(eventName, callback);
}
