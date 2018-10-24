import { IBusEvent } from '../types';

type SubscriptionFn = (
  eventName: string,
  callback: (event: IBusEvent) => any
) => () => void;

const configureWaitForEvent = (subscribe: SubscriptionFn) => <
  EventType extends IBusEvent
>(
  correlationId: string,
  eventType: EventType['type']
): Promise<EventType> => {
  return new Promise((resolve, reject) => {
    let timeout: NodeJS.Timeout;

    const unsubscribe = subscribe(eventType, (e: EventType) => {
      if (correlationId === e.correlationId) {
        unsubscribe();
        resolve(e);
        clearTimeout(timeout);
      }
    });

    timeout = setTimeout(() => {
      unsubscribe();
      reject(`Operation timed out ${eventType}:${correlationId}`);
    }, 5000);
  });
};

export default configureWaitForEvent;
