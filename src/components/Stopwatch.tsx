
import React, { useState, useRef, useCallback } from 'react';
import StopwatchDisplay from './StopwatchDisplay';
import StopwatchControls from './StopwatchControls';
import LapTimes from './LapTimes';

interface LapTime {
  id: number;
  time: number;
  lapTime: number;
}

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - time;
      setIsRunning(true);
      
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }
  }, [isRunning, time]);

  const pause = useCallback(() => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(0);
    setIsRunning(false);
    setLapTimes([]);
    startTimeRef.current = 0;
  }, []);

  const addLap = useCallback(() => {
    if (time > 0) {
      const lastLapTime = lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].time : 0;
      const lapTime = time - lastLapTime;
      
      const newLap: LapTime = {
        id: Date.now(),
        time: time,
        lapTime: lapTime
      };
      
      setLapTimes(prev => [...prev, newLap]);
    }
  }, [time, lapTimes]);

  const canLap = time > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Stopwatch
          </h1>
          <p className="text-gray-400 text-lg">Precision timing at your fingertips</p>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <StopwatchDisplay time={time} />
          
          <StopwatchControls
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onLap={addLap}
            canLap={canLap}
          />
          
          <LapTimes lapTimes={lapTimes} />
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Built with precision • Designed for performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
