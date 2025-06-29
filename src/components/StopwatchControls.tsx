
import React from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

interface StopwatchControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onLap: () => void;
  canLap: boolean;
}

const StopwatchControls: React.FC<StopwatchControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onLap,
  canLap
}) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={isRunning ? onPause : onStart}
        className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${
          isRunning
            ? 'bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
            : 'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500'
        }`}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
      </button>

      <button
        onClick={onLap}
        disabled={!canLap}
        className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${
          canLap
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Square size={20} />
      </button>

      <button
        onClick={onReset}
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
};

export default StopwatchControls;
