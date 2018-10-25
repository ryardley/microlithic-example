import { RxMsgEventEmitter } from 'rxmsg';
import { IBusEvent } from './IBusEvent';

const configureDispatch = <T extends IBusEvent, P extends IBusEvent>(
  emitter: RxMsgEventEmitter<T, P>
) =>
  function dispatch(event: T) {
    // Sometimes we need to listen to an event that has just been dispatched
    // and when using synchronous loopbacks this can cause problems
    setTimeout(() => {
      const eventName = event.type;
      console.log(JSON.stringify({ eventName, event }));
      emitter.emit(eventName, event);
    }, 0);
    return event;
  };

export default configureDispatch;
