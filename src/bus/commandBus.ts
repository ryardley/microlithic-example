import { createEventEmitter } from 'rxmsg';
import { createLoopbackConnector } from 'rxmsg/loopback';

import configureDispatch from './dispatch';
import configureSubscribe from './subscribe';
import configureWaitForEvent from './waitForEvent';

const emitter = createEventEmitter(createLoopbackConnector());

export const dispatch = configureDispatch(emitter);
export const subscribe = configureSubscribe(emitter);
export const waitForEvent = configureWaitForEvent(subscribe);
