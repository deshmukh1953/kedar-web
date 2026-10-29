import React from 'react';
import { DurationType } from '../types';

interface DurationBarProps {
  currentDuration: DurationType;
  onSelectDuration: (duration: DurationType) => void;
}

export const DurationBar: React.FC<DurationBarProps> = ({
  currentDuration,
  onSelectDuration,
}) => {
  return (
    <div className="border-b border-neutral-800/80 bg-[#0c0c0c]/80 backdrop-blur-md py-3 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center space-x-2 text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-semibold text-neutral-300">Active Track Duration:</span>
          <span className="text-orange-400 font-mono font-bold">
            {currentDuration === 1 ? '4 Weeks Sprint' : currentDuration === 2 ? '8 Weeks Architecture' : '24 Weeks Capstone'}
          </span>
        </div>
        <div className="flex items-center p-1 rounded-xl bg-neutral-900/90 border border-neutral-800/80 space-x-1">
          {([1, 2, 6] as DurationType[]).map((dur) => (
            <button
              key={dur}
              onClick={() => onSelectDuration(dur)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                currentDuration === dur
                  ? 'bg-orange-500 text-black shadow-md shadow-orange-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>{dur === 1 ? '⚡' : dur === 2 ? '🚀' : '🏆'}</span>
              <span>{dur} Month{dur > 1 ? 's' : ''}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
