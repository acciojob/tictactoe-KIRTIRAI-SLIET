//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {

	const submitBtn = document.getElementById("submit");
	const player1Input = document.getElementById("player1");
	const player2Input = document.getElementById("player2");

	const startScreen = document.getElementById("start-screen");
	const gameScreen = document.getElementById("game-screen");

	const message = document.querySelector(".message");
	const cells = document.querySelectorAll(".cell");

	let player1 = "";
	let player2 = "";
	let currentPlayer = "X";
	let gameActive = true;

	const winPatterns = [
		[0,1,2],[3,4,5],[6,7,8],
		[0,3,6],[1,4,7],[2,5,8],
		[0,4,8],[2,4,6]
	];

	// Start Game
	submitBtn.addEventListener("click", function () {
		player1 = player1Input.value;
		player2 = player2Input.value;

		if (!player1 || !player2) return;

		startScreen.style.display = "none";
		gameScreen.style.display = "block";

		message.textContent = `${player1}, you're up`;
	});

	// Handle Cell Click
	cells.forEach((cell, index) => {
		cell.addEventListener("click", function () {

			if (cell.textContent || !gameActive) return;

			cell.textContent = currentPlayer;

			if (checkWin()) {
				const winner = currentPlayer === "X" ? player1 : player2;
				message.textContent = `${winner} congratulations you won!`;
				gameActive = false;
				return;
			}

			// Switch player
			currentPlayer = currentPlayer === "X" ? "O" : "X";

			const nextPlayer = currentPlayer === "X" ? player1 : player2;
			message.textContent = `${nextPlayer}, you're up`;
		});
	});

	// Check Win
	function checkWin() {
		return winPatterns.some(pattern => {
			return pattern.every(i => {
				return cells[i].textContent === currentPlayer;
			});
		});
	}

});