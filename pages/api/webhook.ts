import type { NextApiRequest, NextApiResponse } from 'next';

let username = '';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Received request method: ${req.method}`);
  if (req.method === 'POST') {
    const { message } = req.body;
    username = message?.from?.username || '';

    console.log(`Received message from @${username}`);

    res.status(200).json({ message: 'Username received' });
  } else if (req.method === 'GET') {
    console.log(`GET request received, sending username: ${username}`);
    res.status(200).json({ username });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
