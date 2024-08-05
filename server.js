const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { setUsername, getUsername } = require('./username');  // Import the username functions

const app = express();
const port = 3000;

app.use(bodyParser.json());

const TELEGRAM_TOKEN = '7227507147:AAGKUV9pQfYx_4V4pqLuI52t-UVwezOkl7s';
const WEBHOOK_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=https://js-clicker-tma.vercel.app/api/webhook`;

axios.get(WEBHOOK_URL, { timeout: 10000 })  // Increased timeout to 10 seconds
  .then(response => {
    console.log('Webhook set:', response.data);
  })
  .catch(error => {
    console.error('Error setting webhook:', error);
  });

app.post('/api/webhook', (req, res) => {
  const username = req.body.message.from.username;
  setUsername(username);  // Set the username globally
  console.log(`Received message from @${username}`);
  res.json({ message: 'Username received' });
});

app.get('/api/get-username', (req, res) => {
  const username = getUsername();
  res.json({ username });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
