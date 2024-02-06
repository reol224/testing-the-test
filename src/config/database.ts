import './src/boilerplate.polyfill';

import dotenv from 'dotenv';
import * as process from 'process';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

export const dataSource = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}', 'src/**/*.view-entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});

export default dataSource();
