import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';
import logger from '../middleware/logger.middleware';
import { setup } from './setup';

dotenv.config();

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../database.sqlite');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: process.env.NODE_ENV === 'development',
});

export async function sync() {
  try {
    // Check if tables exist
    const tables = await sequelize.getQueryInterface().showAllTables();
    const slidesTableExists = tables.includes('Slides');

    if (!slidesTableExists) {
      await setup();
    } else {
      logger.info('Slides table already exists, skipping creation');
    }
  } catch (error) {
    logger.error('Error checking/creating database tables:', error);
    throw error;
  }
}
