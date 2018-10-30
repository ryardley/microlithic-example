import { RxMsgEventEmitter } from 'rxmsg';
import { BaseEvent } from './BusEvent';

const configureSubscribe = <T extends BaseEvent, P extends BaseEvent>(
  emitter: RxMsgEventEmitter<T, P>
) =>
  function subscribe<Q extends BaseEvent>(
    eventName: Q['type'],
    callback: (event: Q) => any
  ) {
    console.log({ subscribeTo: { eventName } });
    emitter.on(eventName, callback);
    return () => {
      emitter.off(eventName, callback);
    };
  };

export default configureSubscribe;
