let currentPlayer = 'X';
let isGameActive = true;
let players = {};

function chooseMode(mode) {
    document.getElementById('start-screen').style.display = 'none';

    if (mode === 'friend') {
        document.getElementById('name-screen').style.display = 'block';
    } else {
        document.getElementById('name-screen').style.display = 'block';
        document.getElementById('player2').style.display = 'none';
    }
}

function initializeGame() {
    players.player1 = document.getElementById('player1').value || 'Player 1';
    players.player2 = document.getElementById('player2').value || 'AI';

    document.getElementById('name-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    if (players.player2 === 'AI') {
        document.getElementById('players').textContent = `${players.player1} vs ${players.player2}`;
    } else {
        document.getElementById('players').textContent = `${players.player1} vs ${players.player2}`;
    }

    createGameBoard();
}

function createGameBoard() {
    const gameBoard = document.getElementById('game-board');

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    if (!isGameActive) return;

    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        checkWinner(row, col);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (players.player2 === 'AI' && isGameActive) {
            setTimeout(() => makeAIMove(), 500);
        }
    }
}

function checkWinner(row, col) {
    const gameBoard = document.getElementById('game-board');
    const cells = gameBoard.getElementsByClassName('cell');

    if (
        checkRow(row) ||
        checkColumn(col) ||
        checkDiagonal() ||
        checkReverseDiagonal()
    ) {
        isGameActive = false;
        const winner = currentPlayer === 'X' ? players.player1 : players.player2;
        document.getElementById('result').textContent = `${winner} wins the game!`;
    } else if (Array.from(cells).every(cell => cell.textContent !== '')) {
        isGameActive = false;
        document.getElementById('result').textContent = 'It\'s a tie!';
    }
}

function checkRow(row) {
    const cells = document.querySelectorAll(`.cell[data-row='${row}']`);
    return cells[0].textContent !== '' && [...cells].every(cell => cell.textContent === cells[0].textContent);
}

function checkColumn(col) {
    const cells = document.querySelectorAll(`.cell[data-col='${col}']`);
    return cells[0].textContent !== '' && [...cells].every(cell => cell.textContent === cells[0].textContent);
}

function checkDiagonal() {
    const cells = document.querySelectorAll('.cell');
    return cells[0].textContent !== '' && cells[0].textContent === cells[4].textContent && cells[4].textContent === cells[8].textContent;
}

function checkReverseDiagonal() {
    const cells = document.querySelectorAll('.cell');
    return cells[2].textContent !== '' && cells[2].textContent === cells[4].textContent && cells[4].textContent === cells[6].textContent;
}

function makeAIMove() {
    const emptyCells = document.querySelectorAll('.cell:empty');
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = currentPlayer;
        const row = emptyCells[randomIndex].dataset.row;
        const col = emptyCells[randomIndex].dataset.col;
        checkWinner(row, col);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

