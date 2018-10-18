import { filter } from 'rxjs/operators';
import { createConsumer, createProducer } from 'rxmsg';
import { createLoopbackConnector } from 'rxmsg/loopback';

const { receiver, sender } = createLoopbackConnector();

const producer = createProducer(sender());
const consumer = createConsumer(receiver());

export function publish(eventName: string, payload: any) {
  console.log(JSON.stringify({ eventName, payload }));
  producer.next({ content: payload, route: eventName });
}

export function subscribe<T>(eventName: string, callback: (payload: T) => any) {
  console.log({ subscribeTo: { eventName } });
  consumer
    .pipe(filter(m => m.route === eventName))
    .subscribe((m: { content: T }) => callback(m.content));
}
