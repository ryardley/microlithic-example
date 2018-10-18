export default class UserLoggedOutEvent {
  public static readonly symbol = 'auth.UserLoggedOutEvent';
  constructor(public readonly sid: string) {}
}
