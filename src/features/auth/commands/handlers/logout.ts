import { dispatch } from '../../../../bus/eventbus';
import { UserLoggedOutEvent } from '../../types';

import { LogoutCommand } from '../../types';

export default () => async ({ sid }: LogoutCommand) => {
  dispatch(UserLoggedOutEvent({ sid }));

  return true;
};
