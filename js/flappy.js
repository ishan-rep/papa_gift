const canvas = document.getElementById('flappy-game');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const nextButton = document.getElementById('next-puzzle-2');

// Game variables
let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.2, lift: -5, velocity: 0 };
let pipes = [];
let score = 0;
let gameOver = false;
const pipeWidth = 40;
const pipeGap = 185;
let frameCount = 0;
let lastTime = 0;

function gameLoop(timestamp) {
    if (gameOver) return;

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBird();
    updateBird(deltaTime);
    
    drawPipes();
    updatePipes(deltaTime);
    
    checkCollisions();
    updateScore();

    frameCount++;
    requestAnimationFrame(gameLoop);
}

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function updateBird(deltaTime) {
    bird.velocity += bird.gravity * (deltaTime / 16); // Normalize to 60fps
    bird.y += bird.velocity * (deltaTime / 16);

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        resetGame();
    }
}

function drawPipes() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < pipes.length; i++) {
        ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].top);
        ctx.fillRect(pipes[i].x, canvas.height - pipes[i].bottom, pipeWidth, pipes[i].bottom);
    }
}

function updatePipes(deltaTime) {
    if (frameCount % 100 === 0) {
        const top = Math.random() * (canvas.height - pipeGap);
        pipes.push({ x: canvas.width, top: top, bottom: canvas.height - top - pipeGap });
    }

    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 1.5 * (deltaTime / 16); // Normalize to 60fps

        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
        }
    }
}

function checkCollisions() {
    for (let i = 0; i < pipes.length; i++) {
        if (
            bird.x < pipes[i].x + pipeWidth &&
            bird.x + bird.width > pipes[i].x &&
            (bird.y < pipes[i].top || bird.y + bird.height > canvas.height - pipes[i].bottom)
        ) {
            resetGame();
        }
    }
}

function updateScore() {
    for (let i = 0; i < pipes.length; i++) {
        if (pipes[i].x + pipeWidth === bird.x) {
            score++;
            scoreDisplay.textContent = score;
            if (score >= 15) {
                nextButton.style.display = 'block';
                gameOver = true; // Stop the game
            }
        }
    }
}

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    scoreDisplay.textContent = score;
    gameOver = false;
}


document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        bird.velocity = bird.lift;
    }
});

canvas.addEventListener('click', () => {
    bird.velocity = bird.lift;
});


requestAnimationFrame(gameLoop);

// Secret for the next puzzle
const flappySecret = "papa_is_the_best";

if (nextButton) {
    nextButton.addEventListener('click', () => {
        const hash = simpleHash(flappySecret);
        window.location.href = `sequence.html?puzzle=${hash}`;
    });
}
