import { createEventEmitter } from 'rxmsg';
import { createLoopbackConnector } from 'rxmsg/loopback';

const emitter = createEventEmitter<any, any>(createLoopbackConnector());

export async function sendCommand(commandName: string, payload: any) {
  console.log(JSON.stringify({ commandName, payload }));
  emitter.emit(commandName, payload);
  return true; // is ack
}

export function subscribe<T>(
  commandName: string,
  callback: (payload: T) => any
) {
  console.log({ subscribeTo: { commandName } });
  emitter.on(commandName, callback);
}
