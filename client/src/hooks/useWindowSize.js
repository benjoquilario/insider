import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleSize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  });

  return windowSize;
};

export default useWindowSize;
