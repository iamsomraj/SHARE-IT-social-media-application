# Nuxt-Express-Postgres-Social-Media-App

Nuxt-Express-Postgres-Social-Media-App is a full-stack application, where users can register and login in the portal. Users can also create and like posts. There is also a feed where users can see posts from followed users.

## Features

- User Register and Login
- Create Post
- Like Post
- Follow User
- User Feed

## Run This Application

Following steps are required to run the application:

- Open Terminal

- Clone Nuxt-Express-Postgres-Social-Media-App Repository

```bash
    git clone https://github.com/iamsomraj/Nuxt-Express-Postgres-Social-Media-App.git
```

- Go to Root Directory of Nuxt-Express-Postgres-Social-Media-App

- Setup Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `NODE_ENV` : production or development
- `PORT` : port for express server
- `DATABASE_URL` : URI for Postgres connection
- `JWT_SECRET` : For User tokens
- `SALT` : For Hashing Passwords

Create these environment variables, save them in Coding Pillow Editor root folder. File name can be `.env`.

- `.env` file -

```
PORT = {EXPRESS_SERVER_PORT}
DATABASE_URL = postgres://{USERNAME}:@{HOSTNAME}:{DATABASE_PORT}/{DATABASE}
NODE_ENV = development
SALT = {YOUR_SALT}
JWT_SECRET = {YOUR_SECRET}
```

- Run Migrations

```bash
    npx knex migrate:latest
```

- Start Nuxt-Express-Postgres-Social-Media-App

```bash
  npm run dev
```

## Tech Stack

**App:**

- Vue
- Vue Router
- Vuex
- Nuxt
- Tailwind CSS
- Express
- Objection.js
- Postgres

**Language Used:** Javascript

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback or you want to give me some tips related to development or even documentation, please reach out to me at iamsomraj@gmail.com.
