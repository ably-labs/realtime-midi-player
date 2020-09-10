import express from 'express';
import Ably from 'ably/promises';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(`${__dirname}/../../.env`) });

if (process.env.ABLY_API_KEY === undefined) {
  throw new Error(
    'ABLY_API_KEY environment variable not found. You can set this using a .env file in the root of the project.',
  );
}

if (process.env.PORT === undefined) {
  throw new Error(
    'PORT environment variable not found. You can set this using a .env file in the root of the project.',
  );
}

const client = new Ably.Realtime(process.env.ABLY_API_KEY);
const app = express();

app.use(express.static(path.resolve(`${__dirname}/../../client/build`)));

app.get('/api/createEnumerationTokenRequest', async (request, response) => {
  const clientId = String(Math.random());
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId,
    capability: {
      '*': ['channel-metadata', 'presence', 'subscribe'],
    },
  });
  response.send(tokenRequestData);
});

app.get('/api/createChannelTokenRequest', async (request, response) => {
  const channel = request.query.channelId;
  if (typeof channel !== 'string') {
    response.sendStatus(400);
    response.send('invalid channel...');
  } else {
    const clientId = String(Math.random());
    const tokenRequestData = await client.auth.createTokenRequest({
      clientId,
      capability: {
        [channel]: ['publish', 'subscribe', 'presence'],
      },
    });
    response.send(tokenRequestData);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../../client/build/index.html`));
});

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
