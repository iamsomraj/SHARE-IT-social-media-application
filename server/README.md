# SHARE IT - Social Media Application Server

## 🚀 Modernized TypeScript Backend

A modern, type-safe Node.js backend built with Express.js, TypeScript, and PostgreSQL for the SHARE IT social media application.

## ✨ Features

- **Modern TypeScript**: Latest TypeScript 5.7 with strict type checking
- **Express.js**: Fast, minimalist web framework
- **PostgreSQL**: Robust relational database with Knex.js query builder
- **Objection.js**: SQL-friendly ORM with full TypeScript support
- **Schema Validation**: Dual validation with Joi and Zod
- **Authentication**: JWT-based authentication system
- **Security**: Rate limiting, CORS, security headers
- **Code Quality**: ESLint, Prettier, and strict TypeScript configuration
- **Hot Reloading**: Development server with tsx for instant changes

## 📋 Prerequisites

- Node.js (>= 18.0.0)
- npm (>= 8.0.0)
- PostgreSQL database

## 🛠️ Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=4500
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   SALT=your_salt_for_password_hashing
   DEVELOPMENT_CLIENT_ORIGIN=http://localhost:3000
   PRODUCTION_CLIENT_ORIGIN=https://your-frontend-domain.com
   ```

## 🔧 Scripts

### Development

```bash
npm run dev          # Start development server with hot reload
npm run typecheck    # Run TypeScript type checking
```

### Building

```bash
npm run build        # Build for production
npm run start        # Start production server
npm run clean        # Clean build directory
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run prettier     # Check code formatting
npm run prettier:fix # Auto-format code
npm run format       # Run prettier + lint fix
```

### Database

```bash
npm run migrate-latest    # Run latest migrations
npm run migrate-rollback  # Rollback migrations
npm run migrate-make      # Create new migration
npm run data-import       # Reset DB and import seed data
```

## 🏗️ Project Structure

```
src/
├── config/           # Database and app configuration
│   └── db-config.ts
├── controllers/      # Request handlers (TODO: migrate from JS)
├── middlewares/      # Express middlewares
│   ├── auth.ts      # Authentication middleware
│   ├── error.ts     # Error handling
│   └── validation.ts # Request validation
├── models/           # Database models (TODO: migrate from JS)
├── routes/           # API routes (TODO: migrate from JS)
├── schemas/          # Validation schemas (Joi + Zod)
│   └── index.ts
├── services/         # Business logic (TODO: migrate from JS)
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   ├── constants/   # Application constants
│   └── helpers/     # Helper functions
└── index.ts         # Application entry point
```

## 🔌 API Endpoints

### Health & Info

- `GET /` - API information
- `GET /health` - Health check with system metrics

### Authentication (TODO: Complete migration)

- `POST /api/v1/persons/auth` - User login
- `POST /api/v1/persons/` - User registration

### Posts (TODO: Complete migration)

- `GET /api/v1/posts/feed` - Get user feed
- `POST /api/v1/posts/create` - Create new post
- `POST /api/v1/posts/like` - Like a post
- `POST /api/v1/posts/unlike` - Unlike a post

### Users (TODO: Complete migration)

- `GET /api/v1/persons/people` - Get users list
- `POST /api/v1/persons/follow` - Follow a user
- `POST /api/v1/persons/unfollow` - Unfollow a user
- `GET /api/v1/persons/search/` - Search users

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🛡️ Security Features

- **CORS**: Configured for cross-origin requests
- **Rate Limiting**: Basic rate limiting middleware
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Input Validation**: Comprehensive validation with Joi and Zod
- **SQL Injection Protection**: Using parameterized queries with Knex.js

## 🧪 Development

### Type Safety

All API requests and responses are fully typed:

```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface ApiResponse<T> {
  state: boolean;
  message: string;
  data?: T;
}
```

### Adding New Endpoints

1. Define types in `src/types/index.ts`
2. Create validation schemas in `src/schemas/index.ts`
3. Implement controllers with proper typing
4. Add routes with validation middleware

### Database Models

Using Objection.js with full TypeScript support:

```typescript
class PersonsModel extends Model {
  static get tableName() {
    return 'persons';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        // ... schema definition
      },
    };
  }
}
```

## 📈 Monitoring

The `/health` endpoint provides system metrics:

- Server status
- Uptime
- Memory usage
- Timestamp

## 🔄 Migration Status

### ✅ Completed

- TypeScript configuration
- Build system and tooling
- Core middleware and utilities
- Type definitions
- Validation schemas
- Database configuration

### 🚧 In Progress

- Route migration from JavaScript
- Controller migration
- Service layer migration
- Model migration

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use provided ESLint and Prettier configurations
3. Write type-safe code
4. Add proper error handling
5. Include validation for all inputs

## 📝 Environment Variables

| Variable                    | Description                          | Required           |
| --------------------------- | ------------------------------------ | ------------------ |
| `NODE_ENV`                  | Environment (development/production) | Yes                |
| `PORT`                      | Server port                          | No (default: 4500) |
| `DATABASE_URL`              | PostgreSQL connection string         | Yes                |
| `JWT_SECRET`                | Secret for JWT signing               | Yes                |
| `SALT`                      | Salt for password hashing            | Yes                |
| `DEVELOPMENT_CLIENT_ORIGIN` | Frontend URL for development         | No                 |
| `PRODUCTION_CLIENT_ORIGIN`  | Frontend URL for production          | No                 |

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and DATABASE_URL is correct
2. **Type Errors**: Run `npm run typecheck` to identify TypeScript issues
3. **Linting Errors**: Run `npm run lint:fix` to auto-fix common issues
4. **Build Failures**: Ensure all dependencies are installed with `npm install`

### Development Tips

- Use `npm run dev` for hot reloading during development
- Run `npm run format` before committing
- Check `npm run typecheck` to catch type errors early
- Use path aliases (@/types, @/utils) for clean imports

## 📄 License

ISC License - see package.json for details.

---

**Current Version**: 2.1.0  
**Last Updated**: June 2025  
**Maintainer**: Somraj Mukherjee
