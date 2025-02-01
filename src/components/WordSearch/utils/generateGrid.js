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
    const maxWordLength = Math.max(...WORDS.map(word => word.length));
    const size = Math.max(15, maxWordLength); // Ensure grid is at least 15x15

    const grid = Array.from({ length: size }, () => Array(size).fill(''));

    function canPlaceWord(word, row, col, isHorizontal) {
        for (let i = 0; i < word.length; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;

            if (r >= size || c >= size) return false; // Out of bounds

            // Check if the cell is empty OR the letter matches (to allow overlap)
            if (grid[r][c] !== '' && grid[r][c] !== word[i]) return false;
        }
        return true;
    }

    function placeWord(word) {
        let placed = false;

        while (!placed) {
            const isHorizontal = Math.random() > 0.5;
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);

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
    }

    WORDS.forEach(placeWord);

    // Fill empty spaces with random letters
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
