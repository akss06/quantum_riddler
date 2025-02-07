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

    // Helper function to check if selection is a straight line (horizontal/vertical)
    const isValidSelection = (newRow, newCol) => {
        if (selectedCells.length === 0) return true; // First selection is always valid

        const { row: firstRow, col: firstCol } = selectedCells[0];

        // Ensure all selections follow a straight line (horizontal or vertical)
        return newRow === firstRow || newCol === firstCol;
    };

    const handleSelect = (row, col) => {
        const alreadySelected = selectedCells.some(cell => cell.row === row && cell.col === col);

        if (alreadySelected) {
            // Deselect cell if it's already selected
            setSelectedCells(selectedCells.filter(cell => !(cell.row === row && cell.col === col)));
        } else if (isValidSelection(row, col)) {
            // Select new cell if it follows a straight line
            setSelectedCells([...selectedCells, { row, col }]);
        }
    };

    const handleSubmit = () => {
        const selectedWord = selectedCells.map(({ row, col }) => grid[row][col]).join('');

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

        // Keep found words highlighted, but clear selected cells for the next selection
        setSelectedCells([]);
    };

    return (
        <div className="app">
            <h1>Word Search Game</h1>
            <Grid 
                grid={grid} 
                onSelect={handleSelect} 
                selectedCells={selectedCells} 
                foundWords={foundWords}
            />
            <button 
                className="submit-btn" 
                onClick={handleSubmit} 
                disabled={selectedCells.length === 0}
            >
                Check Word
            </button>
            {message && <p className="message">{message}</p>}
            <WordList words={WORDS} foundWords={foundWords.map(f => f.word)} />
            <button 
                className="submit-btn" 
                onClick={onComplete} 
                disabled={foundWords.length !== WORDS.length}
            >
                Finish Game
            </button>
        </div>
    );
}

export default App;
