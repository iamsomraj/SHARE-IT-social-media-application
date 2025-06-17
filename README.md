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

- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Objection.js** - SQL query builder
- **JWT** - Authentication tokens

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database
- npm or yarn

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
   npx knex migrate:latest
   ```

4. **Install Dependencies & Start Development**

   ```bash
   # Install server dependencies
   cd server && npm install

   # Install client dependencies
   cd client && npm install

   # To start both server and client in development mode, run the following command in each directory separately:
   npm run dev
   ```

## 📁 Project Structure

```text
├── client/          # Nuxt 3 frontend application
│   ├── components/  # Vue components
│   ├── pages/       # Application routes
│   ├── stores/      # Pinia state management
│   └── types/       # TypeScript definitions
└── server/          # Express.js backend
    ├── controllers/ # Route handlers
    ├── models/      # Database models
    ├── routes/      # API routes
    └── services/    # Business logic
```

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/iamsomraj/SHARE-IT-social-media-application/issues).

## 📧 Contact

**Somraj Mukherjee** - <iamsomraj@gmail.com>

Project Link: [https://github.com/iamsomraj/SHARE-IT-social-media-application](https://github.com/iamsomraj/SHARE-IT-social-media-application)

---

**Made with ❤️ by [Somraj Mukherjee](https://github.com/iamsomraj)**
