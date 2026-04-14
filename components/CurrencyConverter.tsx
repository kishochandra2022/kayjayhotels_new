
import * as React from 'react';
import { Currency, supportedCurrencies } from '../types';

// --- CONTEXT DEFINITION, PROVIDER, AND HOOK ---
// Centralizing all context logic here to prevent module resolution errors (React #301).

export interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getConvertedPrice: (priceLKR: number) => string;
}

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = React.useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

const fallbackRates = {
  USD: 1,
  LKR: 300.0,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.5,
  CAD: 1.37,
};

type Rates = { [key in Currency]?: number };

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = React.useState<Currency>('LKR');
  const [rates, setRates] = React.useState<Rates>(fallbackRates);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRates = async () => {
      const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const ratesFromApi = data.usd;

        if (!ratesFromApi || Object.keys(ratesFromApi).length === 0) {
            throw new Error("API returned empty data object");
        }

        const newRates: Rates = { ...fallbackRates };
        for (const currencyCode of supportedCurrencies) {
            const lowerCaseCode = currencyCode.toLowerCase();
            if (ratesFromApi[lowerCaseCode]) {
              newRates[currencyCode as Currency] = ratesFromApi[lowerCaseCode];
            }
        }
        
        setRates(newRates);
      } catch (error) {
        console.error("Failed to fetch live currency rates, using fallback.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  const getConvertedPrice = (priceLKR: number) => {
    if (isLoading) return '...';

    const lkrRate = rates['LKR'];
    const targetRate = rates[currency];

    if (!lkrRate || !targetRate) {
      return '...';
    }

    const priceInUSD = priceLKR / lkrRate;
    const convertedPrice = priceInUSD * targetRate;
    
    if (currency === 'LKR') {
      return `LKR ${convertedPrice.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(convertedPrice);
  };

  const value = { currency, setCurrency, getConvertedPrice };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};


// --- THE ACTUAL UI COMPONENT ---

const CurrencyConverter: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="relative">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="bg-brand-dark/50 text-white text-sm rounded-full py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
        aria-label="Select currency"
      >
        {supportedCurrencies.map((curr) => (
          <option key={curr} value={curr} className="bg-brand-dark text-white">
            {curr}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default CurrencyConverter;