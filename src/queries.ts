import { createConnection } from 'typeorm';
import databaseConfig from './config/database';
import auth from './features/auth/queries';

const config = [auth];

export default async function apply() {
  console.log('Creating query connection...');
  const connection = await createConnection({
    ...databaseConfig,
    entityPrefix: 'queries_',
    name: 'queries',
    type: 'postgres'
  });
  console.log('Created query connection');
  config.forEach(init => {
    init(connection);
  });
}
