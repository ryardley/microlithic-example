import { dispatch } from '../../../../bus/EventBus';
import { LogoutCommand } from '../../types/LogoutCommand';
import { UserLoggedOutEvent } from '../../types/UserLoggedOutEvent';

export default async ({ sid }: LogoutCommand) => {
  dispatch(UserLoggedOutEvent({ sid }));
};
