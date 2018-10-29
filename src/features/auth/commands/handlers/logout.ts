import { LogoutCommand } from '../../types/LogoutCommand';
import { UserLoggedOutEvent } from '../../types/UserLoggedOutEvent';
import { Context } from '../index';

export default ({ dispatch }: Context) => async ({ sid }: LogoutCommand) => {
  dispatch(UserLoggedOutEvent.correlated({ sid }));
};
