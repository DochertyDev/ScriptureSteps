
import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 items-end">
        <span className="text-sm font-medium text-stone-600 uppercase tracking-widest">Master Progress</span>
        <span className="text-2xl font-bold text-amber-700 serif">{percentage.toFixed(2)}%</span>
      </div>
      <div className="w-full bg-stone-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-amber-600 to-amber-800 h-full rounded-full transition-all duration-1000 ease-out shadow-md"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
