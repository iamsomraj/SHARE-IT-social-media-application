# SHARE-IT

A modern, full-stack social media platform built with Nuxt 3 and Express. Connect, share, and engage with your community through posts, stories, and real-time interactions.

## 🚀 Features

- **Authentication**: Secure user registration and login
- **Content Creation**: Create and share posts and stories
- **Social Features**: Like, follow, and interact with other users
- **Personalized Feed**: View content from followed users
- **User Discovery**: Search and connect with new users
- **Real-time Updates**: Dynamic content updates

## 🔗 Links

- **Live Demo**: [share-it-social.vercel.app](https://share-it-social.vercel.app/)
- **Video Overview**: [Watch Demo](https://youtu.be/gM3WxzEyJSU)

## 🛠️ Tech Stack

### Frontend

- **Nuxt 3** - Vue.js framework
- **Vue 3** - Progressive JavaScript framework
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Backend

- **Express.js** - Modern web application framework
- **TypeScript** - Full type safety and modern JavaScript features
- **PostgreSQL** - Robust relational database
- **Objection.js** - Type-safe SQL query builder and ORM
- **Knex.js** - SQL query builder and migration tool
- **JWT** - Secure authentication tokens
- **Zod/Joi** - Runtime schema validation
- **ESLint + Prettier** - Code linting and formatting
- **tsx** - Fast TypeScript execution and hot reload

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database
- npm or yarn
- TypeScript knowledge (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/iamsomraj/SHARE-IT-social-media-application.git
   cd SHARE-IT-social-media-application
   ```

2. **Environment Configuration**

   Create `server/.env` in the root directory:

   ```env
   PORT=4500
   DATABASE_URL=postgres://username:password@hostname:5432/database
   NODE_ENV=development
   SALT=your_salt_here
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRATION_DURATION=100d
   PRODUCTION_CLIENT_ORIGIN=https://your-production-url.com
   DEVELOPMENT_CLIENT_ORIGIN=http://localhost:3000
   ```

   Create `client/.env`:

   ```env
   DEV_API=http://localhost:4500
   PROD_API=https://your-api-url.com
   NODE_ENV=development
   ```

3. **Database Setup**

   ```bash
   # Navigate to server directory
   cd server

   # Run database migrations
   npx knex migrate:latest

   # Optional: Seed database with sample data
   npm run data-import
   ```

4. **Install Dependencies & Start Development**

   ```bash
   # Install server dependencies
   cd server && npm install

   # Install client dependencies
   cd ../client && npm install

   # Start server in development mode (with TypeScript hot reload)
   cd ../server && npm run dev

   # In a new terminal, start client in development mode
   cd client && npm run dev
   ```

## 🔧 Development Scripts

### Server Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Database operations
npm run migrate-latest    # Run latest migrations
npm run migrate-rollback  # Rollback last migration
npm run data-import      # Reset DB and import seed data

# Code quality
npm run lint             # Check code with ESLint
npm run lint:fix         # Fix ESLint issues
npm run prettier         # Check code formatting
npm run prettier:fix     # Fix code formatting
npm run typecheck        # TypeScript type checking
npm run format           # Run prettier + eslint fixes
```

## 📁 Project Structure

```text
├── client/               # Nuxt 3 frontend application
│   ├── components/       # Vue components
│   │   ├── app-layouts/  # Header, Footer components
│   │   ├── assets/       # Icon components
│   │   ├── persons/      # User profile components
│   │   ├── posts/        # Post-related components
│   │   ├── user-forms/   # Authentication forms
│   │   └── user-interfaces/ # Reusable UI components
│   ├── composables/      # Vue composables
│   ├── layouts/          # Application layouts
│   ├── middleware/       # Route middleware
│   ├── pages/            # Application routes
│   ├── stores/           # Pinia state management
│   ├── types/            # TypeScript definitions
│   └── utils/            # Utility functions
└── server/               # Express.js TypeScript backend
    ├── src/
    │   ├── config/       # Database and app configuration
    │   ├── controllers/  # Route handlers (auth, person, post)
    │   ├── middlewares/  # Custom middleware (auth, validation, error)
    │   ├── migrations/   # Database migrations
    │   ├── models/       # Objection.js database models
    │   ├── queries/      # Database query builders
    │   ├── routes/       # API route definitions
    │   ├── schemas/      # Validation schemas (Zod/Joi)
    │   ├── seeds/        # Database seed files
    │   ├── services/     # Business logic services
    │   ├── types/        # TypeScript type definitions
    │   └── utils/        # Utility functions and constants
    ├── dist/             # Compiled JavaScript output
    ├── knexfile.js       # Knex configuration
    └── tsconfig.json     # TypeScript configuration
```

## 🏗️ Backend Architecture

### Modern TypeScript Implementation

- **Full TypeScript Coverage**: Complete type safety across the entire backend
- **Path Aliases**: Clean imports using `@/` prefix for better code organization
- **Strict Type Checking**: Enhanced type safety with strict TypeScript configuration
- **Hot Reload Development**: Fast development with `tsx` for instant code changes
- **Modern ES Features**: ES2022 target with latest JavaScript features

### Key Backend Features

- **Type-Safe Database Models**: Objection.js models with full TypeScript support
- **Schema Validation**: Runtime validation using Zod/Joi for API requests
- **Structured Error Handling**: Centralized error handling with custom middleware
- **Security Headers**: Built-in security headers and CORS configuration
- **Environment Configuration**: Type-safe environment variable handling
- **Database Migrations**: Version-controlled database schema management
- **Seed Data**: Automated database seeding for development
- **Health Check Endpoints**: Monitoring and debugging endpoints
- **Graceful Shutdown**: Proper server lifecycle management

## 🔌 API Documentation

### Base URL

- **Development**: `http://localhost:4500/api/v1`
- **Production**: `https://your-api-url.com/api/v1`

### Available Endpoints

#### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

#### Users/Persons

- `GET /persons` - Get all users
- `GET /persons/:uuid` - Get user profile
- `POST /persons/follow` - Follow/unfollow user
- `GET /persons/search` - Search users

#### Posts

- `GET /posts` - Get user feed
- `POST /posts` - Create new post
- `GET /posts/:uuid` - Get specific post
- `POST /posts/:uuid/like` - Like/unlike post

### Health Check

- `GET /` - API status and version info
- `GET /health` - Detailed health check with system info

## 🛠️ Development Tools

### Code Quality

- **ESLint**: Comprehensive linting with TypeScript rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking and modern JavaScript features
- **Husky**: Git hooks for code quality (if configured)

### Database Tools

- **Knex.js**: Database migrations and query building
- **Objection.js**: Type-safe ORM with relationship support
- **Database Seeding**: Automated test data generation

### Development Experience

- **tsx**: Fast TypeScript execution with hot reload
- **Path Aliases**: Clean imports with `@/` prefix
- **Environment Variables**: Type-safe configuration management
- **Error Handling**: Structured error responses with proper HTTP status codes

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/iamsomraj/SHARE-IT-social-media-application/issues).

## 📧 Contact

**Somraj Mukherjee** - <iamsomraj@gmail.com>

Project Link: [https://github.com/iamsomraj/SHARE-IT-social-media-application](https://github.com/iamsomraj/SHARE-IT-social-media-application)

---

**Made with ❤️ by [Somraj Mukherjee](https://github.com/iamsomraj)**
