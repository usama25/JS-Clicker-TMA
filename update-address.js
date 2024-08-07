const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.json());

// Replace with your Telegram bot token
const token = '7227507147:AAGKUV9pQfYx_4V4pqLuI52t-UVwezOkl7s';
const bot = new TelegramBot(token);

const TON_API_URL = 'https://testnet.toncenter.com/api/v2/getAddress'; // Adjust based on the service you use

app.post('/update-address', async (req, res) => {
  const { address } = req.body;

  try {
    // Fetch the balance from the TON blockchain service
    const response = await axios.get(`${TON_API_URL}?address=${address}`);
    const balance = response.data.balance; // Adjust based on the service's response format

    // Send the balance to the user via Telegram bot
    // You need to store the user chat ID from when the user interacted with the bot initially
    const chatId = 'USER_CHAT_ID'; // Replace with actual user chat ID
    await bot.sendMessage(chatId, `Wallet Address: ${address}\nBalance: ${balance}`);

    res.status(200).json({ message: 'Balance sent' });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ message: 'Error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
