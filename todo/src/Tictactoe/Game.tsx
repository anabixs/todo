import { useState } from "react";
import Board from "./Board.tsx";
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const shouldResetHistory =
      isTraveling &&
      JSON.stringify(history[currentMove + 1]) !== JSON.stringify(nextSquares);
    if (shouldResetHistory) {
      const nextHistory = history.slice(0, currentMove + 1);
      setHistory([...nextHistory, nextSquares]);
      setCurrentMove(nextHistory.length);
      setIsTraveling(false);
    } else if (!shouldResetHistory && isTraveling) {
      setCurrentMove(currentMove + 1);
    } else {
      const nextHistory = history;
      setHistory([...nextHistory, nextSquares]);
      setCurrentMove(nextHistory.length);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsTraveling(true);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
