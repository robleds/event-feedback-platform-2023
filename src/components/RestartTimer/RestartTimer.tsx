import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function RestartTimer(props: { delay: number; page: string }) {
  const navigate = useNavigate();
  const totalTimer = props.delay || 60;
  const [seconds, setSeconds] = useState(totalTimer);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1 / 4);
    }, 1000 / 4);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setProgress(100 - (seconds / totalTimer) * 100);
    if (seconds === 0) {
      for (let i = 0; i < 10000; i++) {
        window.clearInterval(i);
      }
      setTimeout(() => {
        navigate(props.page);
      }, 1000);
    }
  }, [seconds]);

  return (
    <>
      <Box sx={{ width: '100%', position: 'absolute', top: 0 }}>
        <LinearProgress color="info" variant="determinate" value={progress} />
      </Box>
    </>
  );
}

RestartTimer.defaultProps = {
  delay: 5,
};
export default RestartTimer;
