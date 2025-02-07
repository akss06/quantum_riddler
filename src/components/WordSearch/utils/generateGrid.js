function generateGrid() {
    const size = 20; // Fixed grid size
    const grid = Array.from({ length: size }, () => Array(size).fill(''));

    function canPlaceWord(word, row, col, isHorizontal) {
        for (let i = 0; i < word.length; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;

            if (r >= size || c >= size) return false; // Out of bounds
            if (grid[r][c] !== '') return false; // No overlapping allowed
        }
        return true;
    }

    function placeWord(word) {
        let attempts = 0;
        let placed = false;

        while (!placed && attempts < 100) { // Avoid infinite loops
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
            attempts++;
        }

        if (!placed) {
            console.warn(`Failed to place word: ${word}`); // Debugging
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
