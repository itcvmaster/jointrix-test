import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';
import logger from '../middleware/logger.middleware';

dotenv.config();

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../database.sqlite');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: process.env.NODE_ENV === 'development',
});

export async function sync() {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: true });
    logger.info('Database synchronized successfully');
  } catch (error) {
    logger.error('Error setting up database:', error);
    throw error;
  }
}
