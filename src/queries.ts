import { createConnection } from 'typeorm';
import databaseConfig from './config/database';
import auth from './features/auth/queries';

// list of queries
const config = [auth];

export default async function apply() {
  const connection = await createConnection({
    ...databaseConfig,
    entityPrefix: 'queries_',
    name: 'queries',
    type: 'postgres',
  });
  config.forEach(init => {
    init(connection);
  });
}
