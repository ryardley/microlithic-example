import User from '../models/User';
import { UserToken } from '../types';

export default async function findUser(userToken: UserToken, id: string) {
  if (!userToken || !['admin', 'user'].includes(userToken.role)) {
    return null;
  }

  return User.findOne(id);
}
