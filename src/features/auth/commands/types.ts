import User from '../models/User';

export type Store = {
  findUserByEmail: (e: string) => Promise<User | void>;
};
