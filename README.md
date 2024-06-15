## Description

It is a chat app using Nest.js framework, Socket.io and MongoDB(Mongoose). You can:

1. Login
2. Create room, Join room, Leave room, Read list rooms by userId.
3. Create message, Delete message(personal/everyone) Read messages by roomId.
4. Send message, receive message event by roomId via websocket.

Here is two demo users

```
[
   {
      "username":"john",
      "password":"john123"
   },
   {
      "username":"maria",
      "password":"maria123"
   }
]
```

See OpenAPI(Swagger) http://localhost:3000/docs/#/

## Installation

```bash
$ yarn
```

## Requirements

- Node version >= 18.12.0
- MongoDB
- NestJS cli

  ```bash
  npm install -g @nestjs/cli
  ```

## Running the app

Create `.env` file

```bash
# Copy from .env.example
$ cp .env.example .env
```

Start the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Environments

```bash
# System
NODE_ENV=local / development / staging / production
PORT=3000

# Database
MONGODB_URI=...

# Secret key to sign a token
JWT_SECRET_KEY=
```
