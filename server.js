const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const TELEGRAM_TOKEN = '7227507147:AAGKUV9pQfYx_4V4pqLuI52t-UVwezOkl7s';
const WEBHOOK_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=https://js-clicker-tma.vercel.app/api/webhook`;

axios.get(WEBHOOK_URL)
  .then(response => {
    console.log('Webhook set:', response.data);
  })
  .catch(error => {
    console.error('Error setting webhook:', error);
  });

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/webhook', (req, res) => {
  const chatId = req.body.message.chat.id;
  const username = req.body.message.from.username;

  // Here, you would send the username to your Next.js app or save it in a database
  console.log(`Received message from @${username}`);

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
