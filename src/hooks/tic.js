import { useEffect, useState } from 'react';

const useTic = (delay) => {
  const [tic, setTic] = useState(false);
  let interval;

  useEffect(() => {
    interval = setInterval(() => setTic(t => !t), delay);
    return () => {
      clearInterval(interval);
    }
  }, []);
  return tic;
};

export default useTic;
