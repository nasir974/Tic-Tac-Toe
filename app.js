const initGame = (function () {
  const gameStatus = document.querySelector(".game-status");
  const restartBtn = document.querySelector(".restart-btn");
  const board = new Array(9).fill("");
  const cell = document.querySelectorAll(".cell");
  const Player = (name, mark) => {
    return { name, mark };
  };
  const playerX = Player("X", "X");
  const playerO = Player("O", "O");
  let currentPlayer = playerO;
  let otherPlayer = playerX;
  gameStatus.textContent = `${currentPlayer.name}'s turn`;
  const checkWinner = () => {
    const winningCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    winningCombo.forEach((combo) => {
      if (
        board[combo[0]] &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[0]] === board[combo[2]]
      ) {
        gameStatus.textContent = `${otherPlayer.name} Won!`;
        restartBtn.style = `display:block;`;
        return;
      }
      if (!board.includes("") && !gameStatus.textContent.includes("Won")) {
        gameStatus.textContent = "Its a Tie";
        restartBtn.style = `display:block;`;
      }
    });
  };
  const gamePlay = () => {
    function cellClicked(e) {
      const box = e.target;
      if (!box === "") {
        return;
      }
      if (
        (board.includes("") && gameStatus.textContent.includes("Won")) ||
        !e.target === ""
      ) {
        return;
      }
      if (currentPlayer === playerX && box.innerText === "") {
        box.style = `color: #324376;`;
      }
      if (box.innerText === "") {
        board[box.id] = currentPlayer.mark;
        box.innerText = currentPlayer.mark;
      } else {
        return;
      }

      currentPlayer = currentPlayer === playerO ? playerX : playerO;
      otherPlayer = otherPlayer === playerX ? playerO : playerX;
      gameStatus.textContent = `${currentPlayer.name}'s turn`;

      checkWinner();
      restartGame();
    }
    cell.forEach((cell) => cell.addEventListener("click", cellClicked, false));
  };
  const restartGame = () => {
    function restart() {
      location.reload();
    }
    return restartBtn.addEventListener("click", restart, false);
  };
  return { gamePlay };
})();

initGame.gamePlay();
