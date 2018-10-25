import { IBusEvent } from './IBusEvent';
import { TimeoutEvent } from './TimeoutEvent';

type SubscriptionFn = (
  eventName: string,
  callback: (event: IBusEvent) => any
) => () => void;
type EventFactory = (a: any) => IBusEvent;
const configureWaitForFirstEvent = (subscribe: SubscriptionFn) => {
  function waitForEvent(
    correlationId: string,
    eventList: EventFactory[],
    timeout: number = 5000
  ): Promise<IBusEvent | TimeoutEvent> {
    return new Promise(resolve => {
      let timeoutId: NodeJS.Timeout;
      const unsubscribes = eventList.map(eventProducer => {
        const eventType = eventProducer({ correlationId }).type;
        return subscribe(eventType, e => {
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
