import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div>



        <span>{`${days} дн`}</span> <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}

export default MyTimer;