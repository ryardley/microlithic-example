import { createEventEmitter } from 'rxmsg';
import { createLoopbackConnector } from 'rxmsg/loopback';

const emitter = createEventEmitter(createLoopbackConnector());

export async function publish(eventName: string, payload: any) {
  console.log(JSON.stringify({ eventName, payload }));
  emitter.emit(eventName, payload);
  return true; // is ack
}

export function subscribe<T>(eventName: string, callback: (payload: T) => any) {
  console.log({ subscribeTo: { eventName } });
  emitter.on(eventName, callback);
}
