import { NextApiRequest, NextApiResponse } from 'next';
import { TonClient, WalletContractV4, fromNano } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { Buffer } from 'buffer';

const TON_CLIENT_ENDPOINT = 'https://testnet.toncenter.com/api/v2/jsonRPC'; // Update with your endpoint if needed

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { address } = req.body;

      if (!address) {
        return res.status(400).json({ error: 'Address is required' });
      }

      // Convert the address to a Buffer
      const publicKey = Buffer.from(address, 'hex'); // Assuming address is in hexadecimal format

      // Initialize the TonClient
      const endpoint = await getHttpEndpoint({ network: 'testnet' });
      const client = new TonClient({ endpoint: endpoint || TON_CLIENT_ENDPOINT });

      // Open wallet and get balance
      const wallet = WalletContractV4.create({ publicKey, workchain: 0 });
      const balance = await client.getBalance(wallet.address);

      return res.status(200).json({ balance: fromNano(balance) });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
