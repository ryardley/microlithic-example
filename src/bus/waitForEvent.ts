import { BaseEvent } from './BusEvent';
import { TimeoutEvent } from './TimeoutEvent';

type SubscriptionFn = (
  eventName: string,
  callback: (event: BaseEvent) => any
) => () => void;

const configureWaitForFirstEvent = (subscribe: SubscriptionFn) => {
  function waitForEvent<
    T extends BaseEvent,
    P extends BaseEvent = T,
    Q extends BaseEvent = P
  >(
    correlationId: string,
    possibleEventOrList: Array<T['type'] | P['type'] | Q['type']> | T['type'],
    timeout: number = 5000
  ): Promise<T | P | Q | TimeoutEvent> {
    return new Promise(resolve => {
      let timeoutId: NodeJS.Timeout;
      const eventList = Array.isArray(possibleEventOrList)
        ? possibleEventOrList
        : [possibleEventOrList];
      const unsubscribes = eventList.map(eventType => {
        // const eventType = eventProducer({ correlationId }).type;
        return subscribe(eventType, (e: T | P | Q) => {
          if (correlationId === e.correlationId) {
            unsubscribes.forEach(u => u());
            resolve(e);
            clearTimeout(timeoutId);
          }
        });
      });

      timeoutId = setTimeout(() => {
        unsubscribes.forEach(u => u());
        console.log(
          `Operation timed out ${eventList.join(',')}:${correlationId}`
        );
        resolve(TimeoutEvent({ correlationId }));
      }, timeout);
    });
  }
  return waitForEvent;
};

export default configureWaitForFirstEvent;
