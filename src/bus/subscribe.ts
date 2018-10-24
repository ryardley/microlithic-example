import { RxMsgEventEmitter } from 'rxmsg';
import { IBusEvent } from 'src/types';

const configureSubscribe = <T extends IBusEvent, P extends IBusEvent>(
  emitter: RxMsgEventEmitter<T, P>
) =>
  function subscribe<Q extends IBusEvent>(
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
