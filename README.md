# SHARE-IT

SHARE-IT - A Modern Social Media Application, where users can register and login in the portal. Users can also create and like posts. There is also a feed where users can see posts from followed users. It is built using Nuxt 2, Vue, Tailwind CSS, Express, Postgres and Objection.js.

## Features

- User Register and Login
- Create Post
- Create Story
- See Stories
- Like Post
- Unlike Post
- Follow User
- Unfollow User
- User Feed
- Search Users
- much more

## Preview Link

✅ [Live] [https://share-it-social.vercel.app/] 😊

## Walkthrough of Share-IT

✅ [Overview] [https://youtu.be/4XcMt8PRFJI]

## Run This Application

Following steps are required to run the application:

- Open Terminal

- Clone SHARE-IT-social-media-application Repository

```bash
    git clone https://github.com/iamsomraj/SHARE-IT-social-media-application.git
```

- Go to Root Directory of SHARE-IT-social-media-application

- Setup Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `NODE_ENV` : For Node environment ( production / development / test )
- `PORT` : port for express server
- `DATABASE_URL` : URI for Postgres connection
- `JWT_SECRET` : For User tokens
- `SALT` : For Hashing Passwords
- `JWT_EXPIRATION_DURATION` : For User token expiration duration

- `DEV_API` : For development API
- `PROD_API` : For production API
- `NODE_ENV` : For Node environment ( production / development / test )

Create these environment variables, save them in root folder. File name can be `.env`.

- `.env` file for server (.env) -

```
PORT = {EXPRESS_SERVER_PORT}
DATABASE_URL = postgres://{USERNAME}:@{HOSTNAME}:{DATABASE_PORT}/{DATABASE}
NODE_ENV = development
SALT = {YOUR_SALT}
JWT_SECRET = {YOUR_SECRET}
JWT_EXPIRATION_DURATION = '100d'
```

- `.env` file for client (client/.env) -

```
DEV_API = {DEVELOPMENT_EXPRESS_SERVER_API_ROUTE}
PROD_API = {PROUDCTION_EXPRESS_SERVER_API_ROUTE}
NODE_ENV = development
```

- Run Migrations

```bash
    npx knex migrate:latest
```

- Start SHARE-IT-social-media-application by going to server and client folder both

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
