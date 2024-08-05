// pages/api/username.ts
import type { NextApiRequest, NextApiResponse } from 'next';

let username = '';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    username = req.body.username;
    res.status(200).json({ message: 'Username received' });
  } else if (req.method === 'GET') {
    res.status(200).json({ username });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
