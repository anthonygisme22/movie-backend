import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// If you want to use a single connection string from, e.g., process.env.DATABASE_URL:
const connectionString = process.env.DATABASE_URL || '';

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    // Only enable SSL in production (Railway, etc.), skip locally
    ssl: process.env.NODE_ENV === 'production'
      ? { require: true, rejectUnauthorized: false }
      : false,
  },
});

export default sequelize;
