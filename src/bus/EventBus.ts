import { createLoopbackConnector } from 'rxmsg/loopback';
import { createMessageBus } from './createMessageBus';

export default createMessageBus(
  createLoopbackConnector({
    persist: async (event: any) => {
      console.log({ EventBus: { event } });
      return true;
    },
  })
);
