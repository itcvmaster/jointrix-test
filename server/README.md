# Markdown Presentation Backend

The backend server for the Markdown Presentation application, built with Node.js, Express, and SQLite.

## Features

- RESTful API for slide management
- SQLite database with Sequelize ORM
- Real-time slide updates
- Error handling and logging
- TypeScript support

## Tech Stack

- Node.js with TypeScript
- Express.js for API routing
- SQLite with Sequelize ORM
- Simple logging as a middleware

## Project Structure

```
server/
├── src/
│   ├── controllers/  # Route controllers
│   ├── models/       # Sequelize models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── middleware/   # Express middleware
│   └── utils/        # Utility functions
└── tests/           # Backend tests
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npm run db:setup
```

3. Start the development server:
```bash
npm run dev
```

The server will be available at http://localhost:3000

## API Endpoints

### Slides

- `GET /api/slides` - Get all slides
- `GET /api/slides/:id` - Get a specific slide
- `POST /api/slides` - Create a new slide
- `PUT /api/slides/:id` - Update a slide
- `DELETE /api/slides/:id` - Delete a slide

### Slide Model

```typescript
interface Slide {
  id: string;
  title: string;
  content: string;
  layout: 'default' | 'title' | 'split' | 'code';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Development

- The development server runs on port 3000
- Hot reloading is enabled
- TypeScript is configured for type checking
- ESLint and Prettier are configured for code quality

## Testing

```bash
npm test
```

## Error Handling

The API uses a consistent error response format:

```json
{
  "error": "Error message"
}
```

## Logging

The application uses Winston for logging. Logs are written to:
- Console in development
- File in production 

## Future Works
- Unit Tests
- Integration Tests