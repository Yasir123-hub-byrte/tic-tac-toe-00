const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X'; // Player X is human
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (cell.textContent || !gameActive || currentPlayer === 'O') return;

    cell.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
        currentPlayer = 'O';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        setTimeout(aiPlay, 500); // AI plays after a delay
    }
}

function aiPlay() {
    if (!gameActive || currentPlayer !== 'O') return;

    let availableCells = [...cells].filter(cell => !cell.textContent);
    if (availableCells.length === 0) return;

    let randomIndex = Math.floor(Math.random() * availableCells.length);
    let cell = availableCells[randomIndex];
    cell.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
        currentPlayer = 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const cellA = cells[a].textContent;
        const cellB = cells[b].textContent;
        const cellC = cells[c].textContent;

        if (cellA && cellA === cellB && cellA === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    const isDraw = [...cells].every(cell => cell.textContent);
    if (isDraw) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
    }
}

function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X'; // Player X starts first
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
