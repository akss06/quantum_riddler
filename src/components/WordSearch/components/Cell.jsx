// src/components/Cell.jsx

import React from 'react';

function Cell({ letter, row, col, onSelect, isSelected, isFound }) {
    // Prevent selecting cells that are already part of a found word
    const handleClick = () => {
        if (!isFound) {
            onSelect(row, col);
        }
    };

    return (
        <div
            className={`cell ${isSelected ? 'selected' : ''} ${isFound ? 'found' : ''}`}
            onClick={handleClick}
        >
            {letter}
        </div>
    );
}

export default Cell;
