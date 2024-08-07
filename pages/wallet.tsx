import { useEffect } from 'react';
import { useTonAddress, TonConnectButton } from '@tonconnect/ui-react';
import axios from 'axios';

const Wallet = () => {
  const address = useTonAddress();

  useEffect(() => {
    if (address) {
      // Send the wallet address to your server
      axios.post('/api/send-address', { address })
        .then(response => {
          console.log('Address sent successfully');
        })
        .catch(error => {
          console.error('Error sending address:', error);
        });
    }
  }, [address]);

  return (
    <div>
      <TonConnectButton />
      {address && <p>Connected Wallet Address: {address}</p>}
    </div>
  );
};

export default Wallet;
