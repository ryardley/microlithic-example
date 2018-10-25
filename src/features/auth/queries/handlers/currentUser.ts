import pick from 'lodash/pick';
import * as QueryBus from '../../../../bus/QueryBus';
import { CurrentUserRequest } from '../../types/CurrentUserRequest';
import { CurrentUserResponse } from '../../types/CurrentUserResponse';
import { Store } from '../types';

export default (store: Store) => async ({
  userToken,
  id,
  correlationId
}: CurrentUserRequest) => {
  if (!userToken) {
    return QueryBus.dispatch(CurrentUserResponse({ correlationId }));
  }
  const user = await store.findUserById(id);

  if (user) {
    QueryBus.dispatch(
      CurrentUserResponse({ correlationId, user: pick(user, ['email']) })
    );
  } else {
    QueryBus.dispatch(CurrentUserResponse({ correlationId }));
  }
};
