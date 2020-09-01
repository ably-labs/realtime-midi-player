## Running Locally

This project uses yarn workspaces to manage scripts and dependencies. If you do not have yarn installed you can install it by running

```
npm i -g yarn
```

With yarn installed you can install dependencies by running

```
yarn install
```

In order to run the app locally you will need to create a `.env` file in the root of the project with the following two environment variables:

```
ABLY_API_KEY=<put your api key here>
PORT=5000
```

Once that `.env` file has been created you can launch the client and server using the following commands respectively:

```
yarn run client
```

```
yarn run server
```

This will launch the client and server on your localhost at port 3000 and port 5000 respectively.

## Deployment

This app is configured for Heroku with a `Procfile` and `heroku-postbuild` script.

In order to run correctly on Heroku you will need to add the ABLY_API_KEY environment variable. You can do this with the following command:

```
heroku config:set ABLY_API_KEY=<put your api key here>
```

## How it works

The `client` directory contains a `create-react-app` which can be launched to connect to channels on the Ably platform. This is done using token authentication and the `server` folder contains an express app which provides token requests using the configured API key from an environment variable.

The `client` app uses Redux for state management and both incoming and outbound Ably messages are handled using Redux middleware, which can be found in `client/src/app/createAblyMiddleware.ts`.
