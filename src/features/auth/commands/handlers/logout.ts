import { publish } from '../../../../bus/eventbus';
import { UserLoggedOutEvent } from '../../types';

import { LogoutCommand } from '../../types';

export default () => async ({ sid }: LogoutCommand) => {
  publish<UserLoggedOutEvent>({ type: 'UserLoggedOutEvent', sid });

  return true;
};
