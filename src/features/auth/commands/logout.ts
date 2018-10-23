import { publish } from '../../../bus/eventbus';
import { UserLoggedOutEvent } from '../types';

import { LogoutCommand } from '../types';

export default () => async ({ sid }: LogoutCommand) => {
  publish<UserLoggedOutEvent>({ kind: 'UserLoggedOutEvent', sid });

  return true;
};
