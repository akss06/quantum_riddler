// src/components/Grid.jsx

import React from 'react';
import Cell from './Cell';

function Grid({ grid, onSelect, selectedCells, foundWords }) {
    return (
        <div className="grid">
            {grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => {
                    const isSelected = selectedCells.some(
                        cell => cell.row === rowIndex && cell.col === colIndex
                    );

                    // Check if this cell is part of any found word's coordinates
                    const isFound = foundWords.some(foundWord =>
                        foundWord.coordinates.some(
                            coord => coord.row === rowIndex && coord.col === colIndex
                        )
                    );

                    return (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            letter={letter}
                            row={rowIndex}
                            col={colIndex}
                            onSelect={onSelect}
                            isSelected={isSelected}
                            isFound={isFound}
                        />
                    );
                })
            )}
        </div>
    );
}

export default Grid;
