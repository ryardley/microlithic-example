import { UserRole } from '../types';
export default class UserRegisteredEvent {
  public static readonly symbol = 'auth.UserRegisteredEvent';
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole
  ) {}
}
