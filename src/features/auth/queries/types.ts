import User from '../models/User';

export type Store = {
  findUserById: (e: string) => Promise<User | void>;
};
