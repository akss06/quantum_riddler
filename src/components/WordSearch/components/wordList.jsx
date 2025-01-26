// src/components/WordList.jsx

import React from 'react';

function WordList({ words, foundWords }) {
    return (
        <div className="word-list">
            <h2>Find these words:</h2>
            <ul>
                {words.map((word, index) => (
                    <li key={index} className={foundWords.includes(word) ? 'found' : ''}>
                        {word}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WordList;
