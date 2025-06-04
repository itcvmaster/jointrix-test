import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { sequelize, sync } from './db/connection';
import slideRoutes from './routes/slide.routes';
import { requestLogger, errorLogger } from './middleware/logger.middleware';
import logger from './middleware/logger.middleware';
import { setup } from './db/setup';
// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;
const apiPrefix = process.env.API_PREFIX || '/api';

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use(`${apiPrefix}/slides`, slideRoutes);

// Error handling
app.use(errorLogger);
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ error: err.message });
});

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully');

    await sync();
    
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
      logger.info(`API available at http://localhost:${port}${apiPrefix}`);
    });
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer(); 