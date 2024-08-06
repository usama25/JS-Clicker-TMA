import { NextApiRequest, NextApiResponse } from 'next';
import { TonClient, WalletContractV4, fromNano, Address } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { address } = req.body;

      if (!address) {
        return res.status(400).json({ error: 'Address is required' });
      }

      // Initialize the TonClient
      const endpoint = await getHttpEndpoint({ network: 'testnet' });
      const client = new TonClient({ endpoint });

      // Convert the address string to Address type
      const walletAddress = Address.parse(address);

      // Open wallet and get balance
      const wallet = WalletContractV4.create({ publicKey: walletAddress.hash as unknown as Buffer, workchain: 0 });

      try {
        const balance = await client.getBalance(wallet.address);
        console.log('Balance fetched successfully:', balance);
        return res.status(200).json({ balance: fromNano(balance) });
      } catch (innerError) {
        if (innerError instanceof Error) {
          console.error('Error fetching balance:', innerError.message);
          return res.status(500).json({ error: 'Error fetching balance', details: innerError.message });
        } else {
          console.error('Unknown error fetching balance');
          return res.status(500).json({ error: 'Unknown error fetching balance' });
        }
      }

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } else {
      console.error('Unknown error');
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default handler;
