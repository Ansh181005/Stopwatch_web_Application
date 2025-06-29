
import React from 'react';

interface LapTime {
  id: number;
  time: number;
  lapTime: number;
}

interface LapTimesProps {
  lapTimes: LapTime[];
}

const LapTimes: React.FC<LapTimesProps> = ({ lapTimes }) => {
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  if (lapTimes.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">Lap Times</h3>
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 max-h-80 overflow-y-auto border border-white/10">
        <div className="space-y-2">
          {lapTimes.map((lap, index) => (
            <div
              key={lap.id}
              className="flex justify-between items-center py-3 px-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200"
            >
              <span className="text-gray-300 font-medium">
                Lap {lapTimes.length - index}
              </span>
              <div className="text-right">
                <div className="text-white font-mono text-lg">
                  {formatTime(lap.lapTime)}
                </div>
                <div className="text-gray-400 font-mono text-sm">
                  {formatTime(lap.time)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LapTimes;
