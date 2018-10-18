import * as bcrypt from 'bcryptjs';
import User from '../models/User';

export default async function register(
  email: string,
  password: string,
  role: 'admin' | 'user'
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashedPassword,
    role
  }).save();
  return true;
}
