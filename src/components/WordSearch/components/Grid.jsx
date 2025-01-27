// src/components/Grid.jsx

import React from 'react';
import Cell from './Cell';

function Grid({ grid, onSelect, selectedCells, foundWords }) {
    const gridSize = grid.length;

    // Dynamically set the grid-template-columns based on the grid size
    const gridStyle = {
        gridTemplateColumns: `repeat(${gridSize}, 40px)`,
    };

    return (
        <div className="grid" style={gridStyle}>
            {grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => {
                    const isSelected = selectedCells.some(
                        cell => cell.row === rowIndex && cell.col === colIndex
                    );

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
