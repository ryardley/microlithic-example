import { createEventEmitter } from 'rxmsg';
import { createLoopbackConnector } from 'rxmsg/loopback';
import { IBusEvent } from 'src/types';

const emitter = createEventEmitter<any, any>(createLoopbackConnector());

export async function dispatch<T extends IBusEvent>(payload: T) {
  const commandName = payload.type;
  console.log(JSON.stringify({ commandName, payload }));
  emitter.emit(commandName, payload);
  return true; // is ack
}

export function subscribe<T extends IBusEvent>(
  commandName: T['type'],
  callback: (payload: T) => any
) {
  console.log({ subscribeTo: { commandName } });
  emitter.on(commandName, callback);
}
