import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const currencies = [
  { symbol: "$", name: "USD" },
  { symbol: "€", name: "EUR" },
  { symbol: "£", name: "GBP" },
  { symbol: "¥", name: "JPY" },
  { symbol: "₹", name: "INR" },
  { symbol: "₩", name: "KRW" },
  { symbol: "₿", name: "BTC" },
];

const CurrencySelector = ({ value, onChange, disabled }: CurrencySelectorProps) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.symbol} value={currency.symbol}>
            {currency.symbol} {currency.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;