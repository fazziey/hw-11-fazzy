import * as React from "react";

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const newSquares = [...squares];
    newSquares[square] = calculateNextValue(squares);
    setSquares(newSquares);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <button
        type="button"
        className="bg-white w-40 h-40 text-9xl rounded-md border justify-center align-middle border-slate-600 hover:bg-gray-600"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="text-2xl">STATUS</div>
      <div className="text-xl flex justify-center pb-5">
        {calculateStatus(
          calculateWinner(squares),
          squares,
          calculateNextValue(squares)
        )}
      </div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="pt-5">
        <button
          className="bg-blue-400 text-white px-4 py-2 rounded-md shadow-lg hover:bg-opacity-75 active:scale-95"
          onClick={restart}
        >
          restart
        </button>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
