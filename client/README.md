# Sire Client

Sire is a file sharing service. This is the front-end client for it.

## Requirements

```
node v17+
yarn
```

## Installation

**NOTE**: It is highly recommended that you install and run this project with docker instead of individually running each component, unless you know what you are doing.

Run `yarn install` in the root directory of this project to install all dependencies.

Once this is done, please populate an `.env.local` using the `.env.local.example` file available in the root directory of this project. The file should look something like this:

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BASE_URL=
```

## Running

Once all dependencies are installed and all environment variables are set, you can run the client.

**NOTE**: The client will not work properly without the API client. To skip all the individual setup of the many components of this project, please run this project with docker-compose (refer to the main README).

To run a development version of the client, use `yarn dev`.

To run in production version of the client, use `yarn start`.
