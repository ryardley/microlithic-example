import User from '../models/User';

export default async function findUserByEmail(email: string) {
  return User.findOne({ where: { email } });
}
