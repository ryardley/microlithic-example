import { createConnection } from 'typeorm';
import databaseConfig from './config/database';
import auth from './features/auth/commands';

const config = [auth];

export default async function apply() {
  console.log('Creating commands connection...');
  const connection = await createConnection({
    ...databaseConfig,
    entityPrefix: 'commands_',
    name: 'commands',
    type: 'postgres'
  });
  console.log('Created commands connection');
  config.forEach(init => {
    init(connection);
  });
}
