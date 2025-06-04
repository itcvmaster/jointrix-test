import { sequelize, setupExampleSlides } from './connection';

async function setup() {
  try {
    // First authenticate the database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Then set up example slides
    await setupExampleSlides();
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setup();