import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const BOT_TOKEN = '7227507147:AAGKUV9pQfYx_4V4pqLuI52t-UVwezOkl7s'; // Replace with your bot token

const verifyTelegramLogin = (data: any): boolean => {
  const authData = data;
  const checkHash = authData.hash;
  delete authData.hash;
  const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();
  const sortedData = Object.keys(authData)
    .sort()
    .map((key) => `${key}=${authData[key]}`)
    .join('\n');
  const hash = crypto.createHmac('sha256', secret).update(sortedData).digest('hex');
  return hash === checkHash;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const isValid = verifyTelegramLogin(req.body);
    if (isValid) {
      res.status(200).json({ username: req.body.username });
    } else {
      res.status(403).json({ error: 'Invalid data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
