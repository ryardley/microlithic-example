import { IBusEvent } from '../types';

type SubscriptionFn = (
  eventName: string,
  callback: (event: IBusEvent) => any
) => () => void;

const configureWaitForEvent = (subscribe: SubscriptionFn) => <
  EventType extends IBusEvent
>(
  correlationId: string,
  eventType: EventType['type'],
  timeout: number = 5000
): Promise<EventType> => {
  return new Promise((resolve, reject) => {
    let timeoutId: NodeJS.Timeout;

    const unsubscribe = subscribe(eventType, (e: EventType) => {
      if (correlationId === e.correlationId) {
        unsubscribe();
        resolve(e);
        clearTimeout(timeoutId);
      }
    });

    timeoutId = setTimeout(() => {
      unsubscribe();
      reject(`Operation timed out ${eventType}:${correlationId}`);
    }, timeout);
  });
};

export default configureWaitForEvent;
