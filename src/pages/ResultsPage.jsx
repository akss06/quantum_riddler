import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const { time, registrationNumber } = location.state || { time: 0, registrationNumber: 'Unknown' };

  // Convert time to minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Calculate minutes
    const secs = seconds % 60; // Calculate remaining seconds
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Format as mm:ss
  };

  return (
    <div className="results-page">
      <h1>Congratulations!</h1>
      <h2>Player Registration: {registrationNumber}</h2> {/* Display the registration number */}
      <h2>You finished the game in {formatTime(time)}!</h2>
      <p>
        We have sent your completion time to the event organizers, and they will be in touch with you soon.
        Good luck!
      </p>
    </div>
  );
};

export default ResultsPage;
