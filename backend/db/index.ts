import { Sequelize } from 'sequelize-typescript';

export default new Sequelize(
  process.env.POSTGRES_DB || 'postgres',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || 'postgres',
  {
    host: process.env.SERVER_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT || 5435),
    dialect: 'postgres',
    models: [__dirname + '/models'],
  },
);
