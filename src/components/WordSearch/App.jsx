// src/App.jsx

import React, { useState, useEffect } from 'react';
import Grid from './components/Grid.jsx';
import WordList from './components/wordList.jsx';
import { generateGrid, WORDS } from './utils/generateGrid.js';
import './App.css';

function App({ onComplete }) {
    const [grid, setGrid] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [foundWords, setFoundWords] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setGrid(generateGrid());
    }, []);

    // Helper to check if selection is horizontal or vertical
    const isValidSelection = (newRow, newCol) => {
        if (selectedCells.length === 0) return true;
    
        const { row: firstRow, col: firstCol } = selectedCells[0];
        const { row: lastRow, col: lastCol } = selectedCells[selectedCells.length - 1];
    
        // Ensure the new cell is within grid bounds
        if (newRow < 0 || newCol < 0 || newRow >= grid.length || newCol >= grid[0].length) {
            return false;
        }
    
        // Check if the new cell is adjacent to the last selected cell (horizontally or vertically)
        const isAdjacent =
            (Math.abs(lastRow - newRow) === 1 && lastCol === newCol) || // Vertical adjacency
            (Math.abs(lastCol - newCol) === 1 && lastRow === newRow); // Horizontal adjacency
    
        return isAdjacent;
    };
    
    const handleSelect = (row, col) => {
        const alreadySelected = selectedCells.some(cell => cell.row === row && cell.col === col);
    
        if (alreadySelected) {
            // Deselect the cell if it's already selected
            setSelectedCells(selectedCells.filter(cell => !(cell.row === row && cell.col === col)));
        } else if (isValidSelection(row, col)) {
            // Select the new cell
            setSelectedCells([...selectedCells, { row, col }]);
        } 
    };
    
    const handleSubmit = () => {
        const selectedWord = selectedCells.map(({ row, col }) => grid[row][col]).join('');
        console.log(`Selected Word: ${selectedWord}`);

        if (WORDS.includes(selectedWord)) {
            if (!foundWords.some(word => word.word === selectedWord)) {
                setFoundWords([
                    ...foundWords,
                    { word: selectedWord, coordinates: selectedCells }
                ]);
                setMessage(`✔️ Correct! Found "${selectedWord}"`);
            } else {
                setMessage(`⚠️ You've already found "${selectedWord}"`);
            }
        } else {
            setMessage(`❌ "${selectedWord}" is not in the list. Try again!`);
        }

        // Reset selection after checking
        setSelectedCells([]);
    };

    const isFinishButtonDisabled = foundWords.length !== WORDS.length;

    return (
        <div className="app">
            <h1>Word Search Game</h1>
            <Grid 
                grid={grid} 
                onSelect={handleSelect} 
                selectedCells={selectedCells} 
                foundWords={foundWords}
            />
            <button className="submit-btn" onClick={handleSubmit} disabled={selectedCells.length === 0}>Check Word</button>
            {message && <p className="message">{message}</p>}
            <WordList words={WORDS} foundWords={foundWords.map(f => f.word)} />
            <button 
                className="submit-btn" 
                onClick={onComplete} 
                //disabled={isFinishButtonDisabled}
            >
                Finish Word Search
            </button>
        </div>
    );
}

export default App;
