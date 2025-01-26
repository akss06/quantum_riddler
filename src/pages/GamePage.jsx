import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import App from '../components/WordSearch/App';
import App2 from '../components/MemoryGame/App';
import App3 from '../components/ConnectionsGame/App';
import GameTimer from '../components/GameTimer';

function GamePage() {
  const [currentGame, setCurrentGame] = useState(1); // Track current game
  const [totalTime, setTotalTime] = useState(0); // Track total elapsed time
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve registration number from HomePage
  const registrationNumber = location.state?.registrationNumber || 'Unknown';

  useEffect(() => {
    // Start global timer for the entire game
    const interval = setInterval(() => {
      setTotalTime((prevTime) => prevTime + 1); // Increment time every second
    }, 1000);

    return () => clearInterval(interval); // Clean up timer on unmount
  }, []);

  const handleGameComplete = () => {
    if (currentGame === 1) {
      setCurrentGame(2); // Move to Memory Game
    } else if (currentGame === 2) {
      setCurrentGame(3); // Move to Connections Game
    } else {
      // Navigate to results page with total time and registration number
      navigate('/results', { state: { time: totalTime, registrationNumber } });
    }
  };

  return (
    <div>
      <GameTimer totalTime={totalTime} /> {/* Display the global timer */}
      <p>Player Registration: {registrationNumber}</p> {/* Display registration number */}
      {currentGame === 1 && <App onComplete={handleGameComplete} />}
      {currentGame === 2 && <App2 onComplete={handleGameComplete} />}
      {currentGame === 3 && <App3 onComplete={handleGameComplete} />}
    </div>
  );
}

export default GamePage;
