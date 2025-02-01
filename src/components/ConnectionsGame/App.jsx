// src/components/ConnectionsGame/App.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectionGrid from './components/ConnectionGrid';
import Header from './components/Header';
import './App.css';
import wordGroups from './data/wordGroups';

const App = ({ onComplete }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [foundGroups, setFoundGroups] = useState([]);
  const [message, setMessage] = useState('');
  const [isAllGroupsFound, setIsAllGroupsFound] = useState(false); 
  const navigate = useNavigate(); 

  const allWords = React.useMemo(() => wordGroups.flat().sort(() => Math.random() - 0.5), []);

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
      return;
    }

    const newSelection = [...selectedWords, word];
    setSelectedWords(newSelection);

    if (newSelection.length === 4) {
      const isMatch = wordGroups.some(group =>
        group.every(word => newSelection.includes(word))
      );
      if (isMatch) {
        setFoundGroups([...foundGroups, newSelection]);
        setMessage('Correct!');
        if (foundGroups.length + 1 === wordGroups.length) {
          setIsAllGroupsFound(true); // All groups found, enable the button
        }
      } else {
        setMessage('Try Again');
      }
      setTimeout(() => setSelectedWords([]), 1000);
    }
  };

  const handleFinishGame = () => {
    onComplete(); // Call onComplete function passed from GamePage
  };

  return (
    <div className="connections-app-container">
      <Header />
      <ConnectionGrid
        allWords={allWords}
        selectedWords={selectedWords}
        foundGroups={foundGroups}
        onWordClick={handleWordClick}
      />
      {message && <p className="connections-message">{message}</p>}

      <button 
        onClick={handleFinishGame} 
       disabled={!isAllGroupsFound} 
        className="submit-btn"
      >
        Finish Game
      </button>
    </div>
  );
};

export default App;
