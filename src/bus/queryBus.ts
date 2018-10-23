import uuid from 'uuid/v4';

import { createEventEmitter } from 'rxmsg';
import { createLoopbackConnector } from 'rxmsg/loopback';

const emitter = createEventEmitter(createLoopbackConnector());

export async function fetch(name: string, payload: any) {
  console.log(JSON.stringify({ query: { name, payload } }));
  // RPC pattern
  return new Promise(res => {
    const correlationId = uuid();
    const replyTo = uuid();
    const handler = ({
      correlationId: corrId,
      content
    }: {
      correlationId: string;
      content: any;
    }) => {
      if (corrId === correlationId) {
        emitter.off(replyTo, handler);
        res(content);
      }
      // TODO: include timeout
    };
    emitter.on(replyTo, handler);
    emitter.emit(name, { content: payload, replyTo, correlationId });
  });
}

export function subscribe<T>(name: string, callback: (c: T) => any) {
  emitter.on(name, ({ correlationId, replyTo, content }) => {
    emitter.emit(replyTo, { correlationId, content: callback(content) });
  });
}
