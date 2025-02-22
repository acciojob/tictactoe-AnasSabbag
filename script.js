let player1, player2;
let currentPlayer;
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

function startGame() {
    const p1 = document.getElementById("player-1").value.trim() || "Player 1";
    const p2 = document.getElementById("player-2").value.trim() || "Player 2";

    player1 = p1;
    player2 = p2;
    currentPlayer = player1;
    gameActive = true;

    document.getElementById("game").style.display = "block";
    document.querySelector(".message").innerHTML = `<h3>${currentPlayer}, you're up</h3>`;
    document.getElementById("players-form").style.display = "none";
}

function makeMove(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer === player1 ? "X" : "O";
    document.querySelectorAll(".cells")[index].innerText = board[index];

    if (checkForWinner()) {
        document.querySelector(".message").innerHTML = `<h3>${currentPlayer} congratulations, you won!</h3>`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        document.querySelector(".message").innerHTML = `<h3>It's a draw!</h3>`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    document.querySelector(".message").innerHTML = `<h3>${currentPlayer}, you're up</h3>`;
}

function checkForWinner() {
    const patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return patterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = player1;

    document.querySelector(".message").innerHTML = `<h3>${currentPlayer}, you're up</h3>`;
    document.querySelectorAll(".cells").forEach(cell => cell.innerText = "");
}
