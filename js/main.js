// Simple hash function for obfuscation
const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(16); // Convert to hexadecimal
};

// --- Puzzle 1: Chess ---
const chessSolutions = [
    "a1a6 b7a6 b6b7",
    "a1a6 b8c7 a6a7",
    "a1a6 b8d6 a6a7",
    "a1a6 b8e5 a6a7",
    "a1a6 b8f4 a6a7",
    "a1a6 b8g3 a6a7",
    "a1a6 b8h2 a6a7"
];

const chessButton = document.getElementById('submit-chess');
if (chessButton) {
    chessButton.addEventListener('click', () => {
        const answer = document.getElementById('chess-answer').value.trim();
        if (chessSolutions.includes(answer)) {
            const hash = simpleHash(answer);
            window.location.href = `flappy.html?puzzle=${hash}`;
        } else {
            alert('Incorrect answer. Please try again.');
        }
    });
}

// --- Puzzle 4: Movie ---
const movieButton = document.getElementById('submit-movie');
if (movieButton) {
    movieButton.addEventListener('click', () => {
        const answer = document.getElementById('movie-answer').value.trim().toLowerCase();
        if (answer === "milan") {
            const hash = simpleHash(answer);
            window.location.href = `final.html?puzzle=${hash}`;
        } else {
            alert('Incorrect answer. Please try again.');
        }
    });
}

// --- Puzzle 3: Sequence ---
const sequenceButton = document.getElementById('submit-sequence');
if (sequenceButton) {
    sequenceButton.addEventListener('click', () => {
        const answer = document.getElementById('sequence-answer').value.trim();
        if (answer === "186") {
            const hash = simpleHash(answer);
            window.location.href = `movie.html?puzzle=${hash}`;
        } else {
            alert('Incorrect answer. Please try again.');
        }
    });
}
