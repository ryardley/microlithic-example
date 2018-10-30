import { createLoopbackConnector } from 'rxmsg/loopback';
import { createMessageBus } from './createMessageBus';

export default createMessageBus(
  createLoopbackConnector({
    persist: async ({ body }: any) => {
      console.log(JSON.stringify({ CommandBus: { [body.type]: body } }));
      return true;
    },
  })
);
