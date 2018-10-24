import { UserToken } from '../../types';
import { Store } from '../types';

export type CurrentUserQueryArgs = {
  userToken: UserToken;
  id: string;
};

export default (store: Store) => async ({
  userToken,
  id
}: CurrentUserQueryArgs) => {
  if (!userToken) {
    return null;
  }
  return await store.findUserById(id);
};
