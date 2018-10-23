import path from 'path';

export default {
  database: 'typeormtest',
  entities: [path.resolve(__dirname, '..', 'features/**/models/*.{ts,js}')],
  host: 'localhost',
  password: 'password',
  port: 5435,
  synchronize: true,
  username: 'typeormtest'
};
