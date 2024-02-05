// import './src/boilerplate.polyfill';

import * as dt from 'dotenv';
import {DataSource} from 'typeorm';
import * as process from "process";

dt.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    'src/**/*.entity{.ts,.js}',
    'src/**/*.view-entity{.ts,.js}',
  ],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});
