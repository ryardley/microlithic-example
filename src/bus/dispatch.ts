import { RxMsgEventEmitter } from 'rxmsg';
import { BaseEvent } from './BusEvent';

const configureDispatch = <T extends BaseEvent, P extends BaseEvent>(
  emitter: RxMsgEventEmitter<T, P>
) =>
  function dispatch(event: T) {
    // Sometimes we need to listen to an event that has just been dispatched
    // and when using synchronous loopbacks this can cause problems
    setTimeout(() => {
      const eventName = event.type;
      emitter.emit(eventName, event);
    }, 0);
    return event;
  };

export default configureDispatch;
