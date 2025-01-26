// src/components/GameTimer.jsx

import React from 'react';

function GameTimer({ totalTime }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ textAlign: 'center', fontSize: '24px', margin: '10px' }}>
      Time Elapsed: {formatTime(totalTime)}
    </div>
  );
}

export default GameTimer;
