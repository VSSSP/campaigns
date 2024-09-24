import { DataSource } from 'typeorm';
import { Campaign } from './domain/entities/Campaign';
import { User } from './domain/entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Campaign],
  synchronize: true,
  logging: true,
});
