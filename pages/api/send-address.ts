// pages/api/send-address.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { address } = req.body;
    
    // Send address to your Telegram bot server
    try {
      await axios.post('https://js-clicker-tma.vercel.app/update-address', { address });
      res.status(200).json({ message: 'Address received' });
    } catch (error) {
      console.error('Error sending address to server:', error);
      res.status(500).json({ message: 'Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
