// context/CoinContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface CoinContextProps {
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
}

const CoinContext = createContext<CoinContextProps | undefined>(undefined);

export const CoinProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState(0);

  return (
    <CoinContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoinContext = () => {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error('useCoinContext must be used within a CoinProvider');
  }
  return context;
};
