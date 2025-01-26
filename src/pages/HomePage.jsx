import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [registrationNumber, setRegistrationNumber] = useState(''); // State to store the registration number
  const [isValid, setIsValid] = useState(false); // State to track if the registration number is valid
  const navigate = useNavigate();

  const handleRegistrationChange = (e) => {
    const value = e.target.value;
    setRegistrationNumber(value);

    // Validate the registration number (example: non-empty and at least 5 characters)
    setIsValid(value.trim().length >= 5);
  };

  const handleStartGame = () => {
    if (isValid) {
      navigate('/game', { state: { registrationNumber } }); // Pass registration number to the game page
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Game!</h1>
      <div className="registration-container">
        <label htmlFor="registration-number">Enter Registration Number:</label>
        <input
          id="registration-number"
          type="text"
          value={registrationNumber}
          onChange={handleRegistrationChange}
          placeholder="Enter your registration number"
        />
      </div>
      <button
        onClick={handleStartGame}
        className="start-button"
        disabled={!isValid} // Disable button if registration number is invalid
      >
        Start Game
      </button>
    </div>
  );
}

export default HomePage;
