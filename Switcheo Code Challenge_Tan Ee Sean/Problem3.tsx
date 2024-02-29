import React, { useEffect, useMemo, useState } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Assuming there's a blockchain property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
    
}

class Datasource {
  constructor(private apiUrl: string) {}

  async getPrices(): Promise<any> {
    try {
      const response = await fetch(this.apiUrl);
      const prices = await response.json();
      return prices;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      console.error(error); // Fixing the typo here
    });
  }, []);

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      });
  }, [balances, prices]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
