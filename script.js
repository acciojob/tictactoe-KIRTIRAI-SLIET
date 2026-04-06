//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const boardDiv = document.getElementById("board");
const messageDiv = document.querySelector(".message");

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) {
	alert("Enter both player names");
	return;
  }

  setupDiv.style.display = "none";
  gameDiv.style.display = "block";

  renderBoard();
  updateMessage();
});

function renderBoard() {
  boardDiv.innerHTML = "";
  boardState.forEach((val, index) => {
	const cell = document.createElement("div");
	cell.classList.add("cell");
	cell.id = index + 1;
	cell.textContent = val;

	cell.addEventListener("click", () => handleClick(index));

	boardDiv.appendChild(cell);
  });
}

function handleClick(index) {
  if (boardState[index] !== "") return;

  boardState[index] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
	const winnerName = currentPlayer === "X" ? player1 : player2;
	messageDiv.textContent = `${winnerName} congratulations you won!`;
	return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateMessage();
}

function updateMessage() {
  const name = currentPlayer === "X" ? player1 : player2;
  messageDiv.textContent = `${name}, you're up`;
}

function checkWinner() {
  return winPatterns.some(pattern => {
	const [a, b, c] = pattern;
	return (
	  boardState[a] &&
	  boardState[a] === boardState[b] &&
	  boardState[a] === boardState[c]
	);
  });
}