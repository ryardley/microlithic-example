import { UserToken } from '../types';
import { Store } from './types';

export type CurrentUserQueryArgs = {
  userToken: UserToken;
  id: string;
};

export default (store: Store) => async ({
  userToken,
  id
}: CurrentUserQueryArgs) => {
  // TODO: This should maybe happen elsewhere
  if (!userToken || !['admin', 'user'].includes(userToken.role)) {
    return null;
  }
  return await store.findUserById(id);
};
