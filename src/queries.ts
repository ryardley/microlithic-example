import { createConnection } from 'typeorm';
import auth from './features/auth/queries';

const config = [auth];

export default async function apply() {
  await createConnection(); // pass this to all querys

  config.forEach(init => {
    init();
  });
}
