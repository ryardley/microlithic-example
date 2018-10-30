import { createLoopbackConnector } from 'rxmsg/loopback';
import { createMessageBus } from './createMessageBus';

export default createMessageBus(
  createLoopbackConnector({
    persist: async ({ body }: any) => {
      console.log(JSON.stringify({ EventBus: { [body.type]: body } }));
      return true;
    },
  })
);
