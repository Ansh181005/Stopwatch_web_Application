
import React from 'react';

interface StopwatchDisplayProps {
  time: number;
}

const StopwatchDisplay: React.FC<StopwatchDisplayProps> = ({ time }) => {
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center mb-8">
      <div className="text-6xl md:text-8xl font-mono font-bold text-white tracking-wider mb-2 drop-shadow-lg">
        {formatTime(time)}
      </div>
      <div className="text-gray-400 text-sm font-medium">MM:SS.MS</div>
    </div>
  );
};

export default StopwatchDisplay;
