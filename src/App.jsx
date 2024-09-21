import { useState } from "react";
import "./App.css";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isCircleTurn, setIsCircleTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState("");

  const handleClick = (index) => {
    if (board[index] !== "" || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isCircleTurn ? "O" : "X";
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setWinner(isCircleTurn ? "O" : "X");
      setGameOver(true);
    } else if (isDraw(newBoard)) {
      setDraw(true);
      setGameOver(true);
    } else {
      setIsCircleTurn(!isCircleTurn);
    }
  };

  const checkWin = (board) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return board[index] === (isCircleTurn ? "O" : "X");
      });
    });
  };

  const isDraw = (board) => {
    return board.every((cell) => cell === "X" || cell === "O");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsCircleTurn(false);
    setGameOver(false);
    setWinner("");
    setDraw(false);
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button id="restartButton" onClick={resetGame}>
        Restart Game
      </button>

      {/* Popup Modal for showing the winner */}
      {gameOver && (
        <div id="winnerPopup" className="popup">
          <div className="popup-content">
            <h2 id="popupMessage">
              {draw ? "It's a Draw!" : `${winner} Wins!`}
            </h2>
            <button id="newGameButton" onClick={resetGame}>
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
