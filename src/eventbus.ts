import { filter } from 'rxjs/operators';
import { createConsumer, createProducer } from 'rxmsg';
import { createLoopbackConnector } from 'rxmsg/loopback';

// Event bus
const eventConnector = createLoopbackConnector();

const eventProducer = createProducer(eventConnector.sender());
const eventConsumer = createConsumer(eventConnector.receiver());

export async function publish(eventName: string, payload: any) {
  console.log(JSON.stringify({ eventName, payload }));
  eventProducer.next({ content: payload, route: eventName });
  return true; // is ack
}

export function subscribe<T>(eventName: string, callback: (payload: T) => any) {
  console.log({ subscribeTo: { eventName } });
  eventConsumer
    .pipe(filter(m => m.route === eventName))
    .subscribe((m: { content: T }) => callback(m.content));
}

// // Command bus
// const commandConnector = createLoopbackConnector();
// const commandProducer = createProducer(commandConnector.sender());
// const commandConsumer = createConsumer(commandConnector.receiver());

// export async function dispatchCommand(commandName: string, payload: any) {
//   console.log(JSON.stringify({ commandName, payload }));
//   commandProducer.next({ content: payload, route: commandName });
//   return true; // is ack
// }

// export function onCommand<T>(
//   commandName: string,
//   callback: (payload: T) => any
// ) {
//   console.log({ subscribeTo: { commandName } });
//   commandConsumer
//     .pipe(filter(m => m.route === commandName))
//     .subscribe((m: { content: T }) => callback(m.content));
// }
