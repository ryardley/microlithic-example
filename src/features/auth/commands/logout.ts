import { DoLogoutFn } from '../types';
import { UserToken } from '../types';

export default async function logout(
  userToken: UserToken,
  doLogout: DoLogoutFn
) {
  if (['admin', 'user'].includes(userToken.role)) {
    doLogout();
    return true;
  }
  return false;
}
