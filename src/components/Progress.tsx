import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar = ({ total, completed }: ProgressBarProps) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 space-y-3">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-gray-600 dark:text-gray-400">
          {completed} of {total} completed
        </span>
        <span className={`font-semibold transition-colors duration-300 ${
          percentage === 100 
            ? 'text-green-600 dark:text-green-400' 
            : percentage > 50 
              ? 'text-purple-600 dark:text-purple-400'
              : 'text-blue-600 dark:text-blue-400'
        }`}>
          {percentage}%
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={percentage} 
          className="h-3 bg-gray-100 dark:bg-gray-700"
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 rounded-full ${
            percentage === 100 
              ? 'from-green-500 to-emerald-500' 
              : percentage > 50 
                ? 'from-purple-500 to-pink-500'
                : 'from-blue-500 to-cyan-500'
          } opacity-20`}
          style={{ 
            width: `${percentage}%`, 
            transition: 'width 0.5s ease-in-out, background 0.5s ease-in-out' 
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;