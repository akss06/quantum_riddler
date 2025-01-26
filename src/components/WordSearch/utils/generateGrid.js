// src/utils/generateGrid.js

const WORDS = ['QUANTUM', 'NODE', 'GRID', 'PUZZLE', 'GAME'];

function generateGrid(size = 10) {
    const grid = Array(size).fill(null).map(() => Array(size).fill(''));

    // Function to check if placing a word would be valid
    function canPlaceWord(word, row, col, isHorizontal) {
        for (let i = 0; i < word.length; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;

            // Check bounds
            if (r < 0 || r >= size || c < 0 || c >= size) return false;

            // Check if the cell is empty or matches the letter
            if (grid[r][c] !== '' && grid[r][c] !== word[i]) return false;

            // Check adjacent cells (up, down, left, right)
            const adjacentCells = [
                [r - 1, c], // Above
                [r + 1, c], // Below
                [r, c - 1], // Left
                [r, c + 1]  // Right
            ];

            for (const [adjRow, adjCol] of adjacentCells) {
                if (adjRow >= 0 && adjRow < size && adjCol >= 0 && adjCol < size) {
                    if (grid[adjRow][adjCol] !== '') return false; // Adjacent cell is not empty
                }
            }
        }
        return true;
    }

    // Place words in the grid (horizontal or vertical)
    WORDS.forEach(word => {
        let placed = false;

        while (!placed) {
            const isHorizontal = Math.random() > 0.5;
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);

            // Check if the word can be placed
            if (canPlaceWord(word, row, col, isHorizontal)) {
                for (let i = 0; i < word.length; i++) {
                    const r = isHorizontal ? row : row + i;
                    const c = isHorizontal ? col + i : col;
                    grid[r][c] = word[i];
                }
                placed = true;
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
