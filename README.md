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

- MongoDB
- NestJS cli

  ```bash
  npm install -g @nestjs/cli
  ```

## Running the app

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
