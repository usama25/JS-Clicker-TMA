import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = 'your-telegram-bot-token';
const TELEGRAM_CHAT_ID = 'your-chat-id'; // Replace with your chat ID or handle this dynamically

// Endpoint to get wallet balance
app.post('/api/balance', async (req: Request, res: Response) => {
  const { address } = req.body;
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
