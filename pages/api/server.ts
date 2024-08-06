import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

// Replace with your Telegram bot token
const TELEGRAM_BOT_TOKEN = '7227507147:AAGKUV9pQfYx_4V4pqLuI52t-UVwezOkl7s'; 
// Replace with your actual server URL
const WEBHOOK_URL = 'https://js-clicker-tma.vercel.app/api/telegram-webhook';

// Function to set up the webhook
const setWebhook = async () => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`;
  try {
    const response = await axios.post(url, { url: WEBHOOK_URL });
    console.log('Webhook set:', response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios error setting webhook:', error.response ? error.response.data : error.message);
    } else if (error instanceof Error) {
      // Handle other errors
      console.error('Error setting webhook:', error.message);
    } else {
      // Handle unexpected error types
      console.error('Unexpected error setting webhook:', error);
    }
  }
};

// Call setWebhook when the server starts
setWebhook();

// Endpoint to handle incoming updates from Telegram
app.post('/api/telegram-webhook', (req: Request, res: Response) => {
  const update = req.body;
  console.log('Received update:', update);

  // Process the update
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Handle different types of messages
    if (text === '/balance') {
      // Example response for balance
      sendMessage(chatId, 'Your balance is 1000 TON.');
    } else if (text.startsWith('/send')) {
      // Example handling of send command
      const [, from, to, amount] = text.split(' ');
      sendMessage(chatId, `Transaction from ${from} to ${to} of amount ${amount} processed.`);
    } else {
      sendMessage(chatId, 'Unknown command.');
    }
  }

  // Respond to Telegram
  res.sendStatus(200);
});

// Function to send a message to a chat
const sendMessage = async (chatId: number, message: string) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
    });
    console.log('Message sent:', response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios error sending message:', error.response ? error.response.data : error.message);
    } else if (error instanceof Error) {
      // Handle other errors
      console.error('Error sending message:', error.message);
    } else {
      // Handle unexpected error types
      console.error('Unexpected error sending message:', error);
    }
  }
};

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
