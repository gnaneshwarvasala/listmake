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
        <span className="text-purple-600 dark:text-purple-400 font-semibold">
          {percentage}%
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={percentage} 
          className="h-3 bg-gray-100 dark:bg-gray-700"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-full"
          style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;