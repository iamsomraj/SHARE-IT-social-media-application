# SHARE-IT-social-media-application

SHARE-IT-social-media-application is a full-stack application, where users can register and login in the portal. Users can also create and like posts. There is also a feed where users can see posts from followed users.

## Features

- User Register and Login
- Create Post
- Like Post
- Unlike Post
- Follow User
- Unfollow User
- User Feed
- Search Users

## Screenshots

- Login
  <img src="/assets/Login.png" alt="Login" />

- Login in Mobile
  <div></div>
  <img src="/assets/LoginMobile.png" alt="LoginMobile" width="270" height="480" />

- Register
  <img src="/assets/Register.png" alt="Register" />

- Register in Mobile
  <div></div>
  <img src="/assets/RegisterMobile.png" alt="RegisterMobile" width="270" height="480" />

- Profile
  <img src="/assets/Profile.png" alt="Profile" />

- Profile in Mobile
  <div></div>
  <img src="/assets/ProfileMobile.png" alt="ProfileMobile" width="270" height="480" />

- Search
  <img src="/assets/Search.png" alt="Search" />

- Search in Mobile
  <div></div>
  <img src="/assets/SearchMobile.png" alt="SearchMobile" width="270" height="480" />

- Feed
  <img src="/assets/Feed.png" alt="Feed" />

- Follow
  <img src="/assets/Follow.png" alt="Follow" />

- Followed
  <img src="/assets/Followed.png" alt="Followed" />

- Like
  <img src="/assets/Like.png" alt="Like" />

- Like in Mobile
  <div></div>
  <img src="/assets/LikeMobile.png" alt="LikeMobile" width="270" height="480" />

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
