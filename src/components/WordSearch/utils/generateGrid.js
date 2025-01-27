// src/utils/generateGrid.js

const WORDS = [
    'QUANTUM',
    'INTERFERENCE',
    'DECOHERENCE',
    'BLOCH',
    'QUBIT',
    'COMPUTING',
    'TUNNELING',
    'ENTANGLEMENT',
];

function generateGrid() {
    // Determine grid size based on longest word
    const maxWordLength = Math.max(...WORDS.map(word => word.length));
    const size = Math.max(15, maxWordLength); // Ensure grid is at least 15x15

    // Create an empty grid with uniform rows and columns
    const grid = Array.from({ length: size }, () => Array(size).fill(''));

    // Function to check if a word can be placed
    function canPlaceWord(word, row, col, isHorizontal) {
        for (let i = 0; i < word.length; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;

            // Check if the position is within bounds
            if (r < 0 || r >= size || c < 0 || c >= size) return false;

            // Check if the cell is empty or matches the letter
            if (grid[r][c] !== '' && grid[r][c] !== word[i]) return false;
        }
        return true;
    }

    // Place words in the grid
    WORDS.forEach((word) => {
        let placed = false;

        while (!placed) {
            const isHorizontal = Math.random() > 0.5;
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);

            // Ensure the word fits in the grid
            if (
                (isHorizontal && col + word.length <= size) || 
                (!isHorizontal && row + word.length <= size)
            ) {
                if (canPlaceWord(word, row, col, isHorizontal)) {
                    for (let i = 0; i < word.length; i++) {
                        const r = isHorizontal ? row : row + i;
                        const c = isHorizontal ? col + i : col;
                        grid[r][c] = word[i];
                    }
                    placed = true;
                }
            }
        }
    });

    // Fill remaining cells with random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }

    return grid;
}

export { generateGrid, WORDS };
