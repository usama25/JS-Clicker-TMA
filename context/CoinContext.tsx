// context/CoinContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CoinContextProps {
  coins: number;
  addCoins: (amount: number) => void;
  subtractCoins: (amount: number) => void;
}

const CoinContext = createContext<CoinContextProps | undefined>(undefined);

export const CoinProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState(0);

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  const subtractCoins = (amount: number) => {
    setCoins((prev) => prev - amount);
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins, subtractCoins }}>
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
