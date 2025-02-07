import React from 'react';

function Cell({ letter, row, col, onSelect, isSelected, isFound }) {
    const handleClick = () => {
        onSelect(row, col); // Allow selection of found letters
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
