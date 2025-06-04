# Markdown Presentation Frontend

The frontend part of the Markdown Presentation application, built with React.js and Vite.

## Features

- Create and edit presentations using markdown
- Real-time markdown preview with syntax highlighting
- Code syntax highlighting
- Multiple slide layouts
- Presentation progress tracking
- Hotkey support
- Mobile-responsive design
- Custom markdown parser with AST

## Tech Stack

- React.js with TypeScript
- Vite for build tooling
- Material-UI for components
- React Router for navigation
- React Markdown for markdown rendering
- React Syntax Highlighter for code blocks

## Project Structure

```
client/
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   └── styles/       # CSS/SCSS files
├── public/           # Static assets
└── stories/         # Storybook stories
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

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Storybook

```bash
npm run storybook
```

## Development

- The development server runs on port 5173
- Hot Module Replacement (HMR) is enabled
- TypeScript is configured for type checking
- ESLint and Prettier are configured for code quality

## API Integration

The frontend communicates with the backend API at http://localhost:3000/api for:
- Fetching presentations
- Creating new presentations
- Updating existing presentations
- Deleting presentations
