const initGame = (function () {
  const gameStatus = document.querySelector(".game-status");
  const restartBtn = document.querySelector(".restart-btn");
  const board = new Array(9).fill(null);
  const playerO = "O";
  const playerX = "X";
  let currentPlayer = playerX;
  const cell = document.querySelectorAll(".cell");
  

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
        gameStatus.textContent = `${currentPlayer} Won!`;
        restartBtn.style = `display:block;`;
        return;
      }
      if (!board.includes(null) && !gameStatus.textContent.includes("Won")) {
        gameStatus.textContent = "Its a Tie";
        restartBtn.style = `display:block;`;
      }
    });
  };
  const gamePlay = () => {
    function cellClicked(e) {
      if (board.includes(null) && gameStatus.textContent.includes("Won")) {
        return;
      }
      const box = e.target;
      board[box.id] = currentPlayer;
      currentPlayer = currentPlayer === playerO ? playerX : playerO;
      if (currentPlayer === playerX && box.innerText === "") {
        box.style = `color: #324376;`;
      }
      if (box.innerText === "") {
        box.innerText = currentPlayer;
      } else {
        return;
      }
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
