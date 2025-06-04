# Markdown Presentation App

A web-based presentation application that allows users to create and present slides using markdown syntax. This application is built with React.js, Node.js, Express.js, and SQLite.

## Features

- Create and edit presentations using markdown
- Navigate through slides with forward/backward controls
- Real-time markdown preview
- Code syntax highlighting
- Multiple slide layouts
- Presentation progress tracking
- Hotkey support
- Mobile-responsive design
- Custom markdown parser with AST
- Unit and integration tests
- Component library with Storybook

## Tech Stack

- Frontend: React.js
- Backend: Node.js/Express.js
- Database: SQLite with Sequelize ORM
- Testing: Jest, React Testing Library
- Component Development: Storybook
- Build Tools: Vite

## Project Structure

```
markdown-presentation/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utility functions
│   │   └── styles/       # CSS/SCSS files
│   └── stories/          # Storybook stories
├── server/                # Backend Express application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Sequelize models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   └── tests/            # Backend tests
└── shared/               # Shared types and utilities
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd markdown-presentation
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up the database:
```bash
cd server
npm run db:setup
```

4. Start the development servers:
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd client
npm run dev
```

## Development

- Frontend runs on: http://localhost:5173
- Backend runs on: http://localhost:3000

## Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

## Storybook

```bash
cd client
npm run storybook
```

