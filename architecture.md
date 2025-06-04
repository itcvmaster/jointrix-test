# Markdown Presentation Application Architecture

## Overview

The Markdown Presentation application is a full-stack web application that allows users to create and present slides using markdown syntax. The application follows a client-server architecture with a React frontend and Node.js/Express backend.

## System Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │     │   Server    │     │  Database   │
│  (React)    │◄────┤  (Express)  │◄────┤   (SQLite)  │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Frontend Architecture

The frontend is built with React and follows a component-based architecture:

```
client/
├── components/          # UI Components
│   ├── PresentationView # Main presentation container
│   ├── SlideRenderer   # Markdown renderer
│   ├── SlideEditor     # Markdown editor
│   ├── Navigation      # Slide navigation
│   └── ProgressBar     # Progress indicator
├── hooks/              # Custom React hooks
│   └── useSlideStore   # State management
├── store/              # Zustand store
├── services/           # API services
└── types/              # TypeScript types
```

### Backend Architecture

The backend follows a layered architecture:

```
server/
├── controllers/        # Request handlers
├── services/          # Business logic
├── models/            # Database models
├── routes/            # API routes
└── middleware/        # Express middleware
```

## Design Considerations

### 1. State Management

**Choice**: Zustand over Redux
- **Why**: Simpler API, less boilerplate, better TypeScript support
- **Future**: Easy to add middleware, persistence, and devtools

### 2. Database

**Choice**: SQLite over PostgreSQL/MongoDB
- **Why**: 
  - Simple setup, no external dependencies
  - Sufficient for single-user/small team use
  - Easy to backup and version control
- **Future**: 
  - Schema designed to support future features
  - Easy migration path to PostgreSQL if needed

### 3. Markdown Processing

**Choice**: Client-side rendering over server-side
- **Why**: 
  - Better performance
  - Reduced server load
  - Immediate preview
- **Future**: 
  - Support for custom markdown extensions
  - Server-side rendering option for static exports

### 4. Slide Storage

**Choice**: Single table with layout field
- **Why**: 
  - Simple schema
  - Flexible layout system
- **Future**: 
  - Support for custom layouts
  - Slide templates
  - Slide categories/tags

## Database Schema

```sql
CREATE TABLE slides (
  id UUID PRIMARY KEY DEFAULT (uuid()),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  layout VARCHAR(50) NOT NULL DEFAULT 'default',
  order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_slides_order ON slides(order);
CREATE INDEX idx_slides_layout ON slides(layout);
```

## Future Features Accommodated

1. **Multi-user Support**
   - Database schema ready for user associations
   - State management supports user context
   - API endpoints designed for authentication

2. **Presentation Management**
   - Database schema supports presentation grouping
   - UI components designed for presentation switching
   - State management ready for multiple presentations

3. **Export Options**
   - Markdown processing supports multiple formats
   - UI components ready for export controls
   - API endpoints designed for bulk operations

4. **Customization**
   - Layout system supports custom themes
   - Component architecture supports plugins
   - State management supports user preferences

## Challenges and Solutions

### 1. Real-time Preview Performance

**Challenge**: Large markdown documents caused UI lag
**Solution**: 
- Used React.memo for expensive components
- Optimized markdown parsing

### 2. State Synchronization

**Challenge**: Keeping UI in sync with server state
**Solution**:
- Implemented optimistic updates
- Added loading states
- Used Zustand for predictable state management

### 3. Database Migrations

**Challenge**: Managing schema changes
**Solution**:
- Used Sequelize migrations
- Implemented version control for schema
- Added database setup script

### 4. Type Safety

**Challenge**: Maintaining type safety across stack
**Solution**:
- Shared TypeScript types
- Strict type checking
- API response validation

## Takeaways

1. **Simplicity First**
   - Start with simple solutions
   - Add complexity only when needed
   - Document design decisions

2. **Type Safety**
   - TypeScript across the stack
   - Shared type definitions
   - Runtime validation

3. **Developer Experience**
   - Clear project structure
   - Comprehensive documentation
   - Easy setup process

4. **Future-Proofing**
   - Modular architecture
   - Extensible design
   - Clear upgrade paths

## Database File

The SQLite database file is located at:
```
server/db/presentation.db
```

To use a fresh database:
1. Delete the existing database file
2. Run `npm run db:setup` in the server directory
3. The setup script will create a new database with example slides 