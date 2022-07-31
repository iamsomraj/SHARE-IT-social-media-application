# SHARE-IT-social-media-application

SHARE-IT-social-media-application is a full-stack application, where users can register and login in the portal. Users can also create and like posts. There is also a feed where users can see posts from followed users.

## Features

- User Register and Login
- Create Post
- Like Post
- Follow User
- User Feed

## Screenshots

- Login
  <img src="/assets/Login.png" alt="Login" />

- Explore
  <img src="/assets/Explore.png" alt="Explore" />

- Feed
  <img src="/assets/Feed.png" alt="Feed" />

- Profile
  <img src="/assets/Profile.png" alt="Profile" />
  
- Followed
  <img src="/assets/Followed.png" alt="Followed" />

## Walkthrough Video

[Video](https://youtu.be/OsheRzgu9s4)

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

Create these environment variables, save them in Coding Pillow Editor root folder. File name can be `.env`.

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
DEV_API = {DEVELOPMENT_EXPRESS_SERVER_API_ROUTE};
PROD_API = {PROUDCTION_EXPRESS_SERVER_API_ROUTE};
NODE_ENV = development
```

- Run Migrations

```bash
    npx knex migrate:latest
```

- Start SHARE-IT-social-media-application

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
