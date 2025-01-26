import React from 'react';

const ConnectionGrid = ({ allWords, selectedWords, foundGroups, onWordClick }) => {
  const isWordFound = (word) => foundGroups.some(group => group.includes(word));

  return (
    <div className="connections-grid">
      {allWords.map((word, idx) => (
        <button
          key={idx}
          className={`connections-word-btn ${
            selectedWords.includes(word) ? 'selected' : ''
          } ${isWordFound(word) ? 'found' : ''}`}
          onClick={() => onWordClick(word)}
          disabled={isWordFound(word)}
        >
          {word}
        </button>
      ))}
    </div>
  );
};

export default ConnectionGrid;