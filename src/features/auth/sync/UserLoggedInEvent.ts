import { UserToken } from '../types';
export default class UserLoggedInEvent {
  public static readonly symbol = 'auth.UserLoggedInEvent';
  constructor(
    public readonly userToken: UserToken,
    public readonly sid: string
  ) {}
}
