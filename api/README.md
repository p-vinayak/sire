# Sire API

Sire is a file sharing service. This is the back-end API service for it.

## Project Structure

This project has 3 major parts

- Routers
- Services
- Middlewares

### Routers

Routers handle all of the endpoint routing for the API service. For example, the files router will handle all functionality related to files and will host all the endpoints under `/files` URL.

### Services

Services offer the main interface to the database and are mostly used by routers to perform business logic. Services often use the `prisma` module, which represents the DB connection and is used to make queries.

Services often perform functionalities such as create, read, update, and delete.

### Middlewares

Middlewares sit between a request and a response and are often used to host functionality that is often shared between routes. This can be anywhere from error handling to checking for authentication.

## Requirements

```
node v14+
yarn
postgresql
redis
```

## Installation

**NOTE**: It is highly recommended that you install and run this project with docker instead of individually running each component, unless you know what you are doing.

Run `yarn install` in the root directory of this project to install all dependencies. Following this, populate an `.env` file using the `.env_example` available in the root directory of this project.

```
DATABASE_URL=
SESSION_SECRET=
PORT=
UPLOAD_PATH=
CLIENT_URL=
REDIS_HOST=
REDIS_PORT=
BASE_URL=
```

**NOTE**: If you are using docker-compose, the UPLOAD_PATH value should match the volume created inside docker and not the upload path on the host machine.

Once this is finished, you must create a DB named `sire` in your postgres service and run `npx prisma db push` in the root directory of this to initialize the DB before running this project.

## Running

To run a development version, use `yarn dev`.

To run in production version, use `yarn start`.
