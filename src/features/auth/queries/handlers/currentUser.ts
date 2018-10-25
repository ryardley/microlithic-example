import pick from 'lodash/pick';

import { CurrentUserRequest } from '../../types/CurrentUserRequest';
import { CurrentUserResponse } from '../../types/CurrentUserResponse';
import { Context } from '../index';

export default ({ store, dispatch }: Context) => async ({
  userToken,
  id,
  correlationId,
}: CurrentUserRequest) => {
  if (!userToken) {
    return dispatch(CurrentUserResponse({ correlationId }));
  }
  const user = await store.findUserById(id);

  if (user) {
    dispatch(
      CurrentUserResponse({ correlationId, user: pick(user, ['email']) })
    );
  } else {
    dispatch(CurrentUserResponse({ correlationId }));
  }
};
