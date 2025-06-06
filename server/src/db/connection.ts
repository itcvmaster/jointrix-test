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
    // Check if tables exist
    const tables = await sequelize.getQueryInterface().showAllTables();
    const slidesTableExists = tables.includes('slides');

    if (!slidesTableExists) {
      await setupExampleSlides();
    } else {
      logger.info('Slides table already exists, skipping creation');
    }
  } catch (error) {
    logger.error('Error checking/creating database tables:', error);
    throw error;
  }
}

export async function setupExampleSlides() {
  try {
    // Import Slide model here to avoid circular dependency
    const { Slide } = require('../models/Slide');
    
    // Sync all models with the database
    await sequelize.sync({ force: true });
    logger.info('Database synchronized successfully');

    logger.info('Creating example slides');

    const exampleSlides = [
      {
        title: 'Welcome to MarkPresent',
        content: `# Welcome to MarkPresent
## A Modern Markdown Presentation Tool

- **Navigate** with arrow keys or buttons
- **Edit** slides with live preview
- **Code highlighting** with syntax support
- **Multiple layouts** for different content types

Let's get started! →`,
        layout: 'title',
        order: 0
      },
      {
        title: 'Features Overview',
        content: `# Key Features

## 🚀 What Makes It Special

- **Markdown Support**: Write slides in familiar markdown syntax
- **Live Editing**: See changes in real-time
- **Code Highlighting**: Syntax highlighting for multiple languages
- **Responsive Design**: Works great on mobile and desktop
- **Keyboard Navigation**: Use arrow keys to navigate
- **Progress Tracking**: Visual progress bar

## 📱 Mobile Friendly
Fully responsive design that works on all devices.`,
        layout: 'default',
        order: 1
      },
      {
        title: 'Code Example',
        content: `# Code Highlighting Example

Here's how code looks in our presentation:

\`\`\`javascript
function createSlide(title, content) {
  return {
    id: generateId(),
    title,
    content,
    layout: 'default',
    order: getNextOrder()
  };
}

// Usage example
const newSlide = createSlide(
  'My Slide',
  '# Hello World\\n\\nThis is markdown content!'
);
\`\`\`

The syntax highlighting works for many languages including JavaScript, Python, HTML, CSS, and more!`,
        layout: 'code',
        order: 2
      },
      {
        title: 'Split Layout',
        content: `# Split Layout Example

## Left Side Content
This layout allows you to split content into two columns.

### Perfect for:
- Comparisons
- Before/After
- Code and explanation
- Images and text

---

## Right Side Content
You can use the horizontal rule (\`---\`) to separate left and right content.

### Benefits:
- Better use of space
- Clearer organization
- More visual appeal
- Flexible content arrangement`,
        layout: 'split',
        order: 3
      }
    ];

    for (const slideData of exampleSlides) {
      await Slide.create(slideData);
      logger.info(`Created example slide: ${slideData.title}`);
    }
    logger.info('All example slides created successfully');
  } catch (error) {
    logger.error('Error setting up database:', error);
    throw error;
  }
}