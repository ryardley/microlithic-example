import { createConnection } from 'typeorm';
import databaseConfig from './config/database';
import auth from './features/auth/commands';

// List of commands
const config = [auth];

export default async function apply() {
  const connection = await createConnection({
    ...databaseConfig,
    entityPrefix: 'commands_',
    name: 'commands',
    type: 'postgres'
  });

  config.forEach(init => {
    init(connection);
  });
}
