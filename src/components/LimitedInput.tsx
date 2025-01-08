import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface LimitedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number;
  showCounter?: boolean;
  onValueChange?: (value: string) => void;
}

const LimitedInput = ({
  maxLength = 100,
  showCounter = true,
  onValueChange,
  value,
  onChange,
  className,
  ...props
}: LimitedInputProps) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(inputValue?.toString().length || 0);
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setInputValue(newValue);
      setCharCount(newValue.length);
      onChange?.(e);
      onValueChange?.(newValue);
    } else {
      toast.error(`Maximum ${maxLength} characters allowed`);
    }
  };

  return (
    <div className="w-full">
      <Input
        {...props}
        value={inputValue}
        onChange={handleChange}
        className={`dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 ${className}`}
        maxLength={maxLength}
      />
      {showCounter && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {charCount}/{maxLength} characters
        </div>
      )}
    </div>
  );
};

export default LimitedInput;