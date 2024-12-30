import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar = ({ total, completed }: ProgressBarProps) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 space-y-2">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>{completed} of {total} completed</span>
        <span>{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export default ProgressBar;