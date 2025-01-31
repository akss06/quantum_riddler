import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const { time, registrationNumber } = location.state || { time: 0, registrationNumber: 'Unknown' };
  const [isDataSent, setIsDataSent] = useState(false); // Track if data is sent

  // Function to format time in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Send results to backend only once
  useEffect(() => {
    if (!isDataSent) {
      const sendResults = async () => {
        try {
          const response = await fetch('/api/results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time, registrationNumber }),
          });

          if (response.ok) {
            console.log('Results sent successfully');
            setIsDataSent(true); // Mark data as sent
          } else {
            const data = await response.json();
            console.log('Error:', data.message);
          }
        } catch (error) {
          console.error('Error sending results:', error);
        }
      };

      sendResults();
    }
  }, [isDataSent, time, registrationNumber]); // Only re-run if `isDataSent` is false

  return (
    <div className="results-page">
      <h1>Congratulations!</h1>
      <h2>Player Registration: {registrationNumber}</h2>
      <h2>You finished the game in {formatTime(time)}!</h2>
      <p>
        We have sent your completion time to the event organizers, and they will be in touch with you soon.
        Good luck!
      </p>
    </div>
  );
};

export default ResultsPage;
