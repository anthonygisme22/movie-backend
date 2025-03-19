import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Choose connection string based on environment
let connectionString;
if (process.env.NODE_ENV === 'production') {
  // In production, use Railway's connection string
  connectionString = process.env.DATABASE_URL;
} else {
  // In development, build connection string from local settings
  // In development, build connection string from local settings with URL-encoded password
connectionString = `postgresql://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

}

// Enable SSL if needed in production
const useSSL = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: useSSL ? { require: true, rejectUnauthorized: false } : false,
  },
});

export default sequelize;
