import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = '7227507147:AAGKUV9pQfYx_4V4pqLuI52t-UVwezOkl7s'; // Replace with your Telegram bot token

let TELEGRAM_CHAT_ID: string | null = null;

// Function to fetch the chat ID
const fetchChatId = async (): Promise<void> => {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    const updates = response.data.result;
    if (updates.length > 0) {
      TELEGRAM_CHAT_ID = updates[0].message.chat.id;
      console.log(`Chat ID fetched: ${TELEGRAM_CHAT_ID}`);
    } else {
      console.error('No updates found to fetch chat ID.');
    }
  } catch (error) {
    console.error('Error fetching chat ID:', error);
  }
};

// Fetch chat ID when the server starts
fetchChatId();

// Endpoint to get wallet balance
app.post('/api/balance', async (req: Request, res: Response) => {
  const { address } = req.body;
  if (!TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'Chat ID is not set.' });
  }
  try {
    const message = `/balance ${address}`;
    const response = await sendMessageToTelegram(message);
    res.json({ balance: response });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Endpoint to make a transaction
app.post('/api/transaction', async (req: Request, res: Response) => {
  const { from, to, amount } = req.body;
  if (!TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'Chat ID is not set.' });
  }
  try {
    const message = `/send ${from} ${to} ${amount}`;
    const response = await sendMessageToTelegram(message);
    res.json({ result: response });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Function to send messages to Telegram bot
const sendMessageToTelegram = async (message: string): Promise<string> => {
  if (!TELEGRAM_CHAT_ID) {
    throw new Error('Chat ID is not set.');
  }
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await axios.post(url, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  });
  return response.data.result.text;
};

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
