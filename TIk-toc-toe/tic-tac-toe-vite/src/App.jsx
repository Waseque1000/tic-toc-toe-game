// import { useState } from "react";

// function App() {
//   const [board, setBoard] = useState(Array(9).fill("")); // Initialize the game board
//   const [currentPlayer, setCurrentPlayer] = useState("X"); // Current player (X or O)
//   const [winner, setWinner] = useState(null); // Winner of the game

//   // Check if a player has won
//   const checkWinner = (board) => {
//     const winConditions = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8], // Rows
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8], // Columns
//       [0, 4, 8],
//       [2, 4, 6], // Diagonals
//     ];

//     for (let condition of winConditions) {
//       const [a, b, c] = condition;
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         return board[a]; // Return the winning player (X or O)
//       }
//     }
//     return null; // No winner
//   };

//   // Check if the game is a draw
//   const isDraw = (board) => {
//     return board.every((cell) => cell !== "") && !checkWinner(board);
//   };

//   // Handle a player's move
//   const handleMove = (index) => {
//     if (board[index] || winner) return; // If the cell is already filled or the game is over, do nothing

//     const newBoard = [...board];
//     newBoard[index] = currentPlayer; // Update the board with the current player's move
//     setBoard(newBoard);

//     const winnerPlayer = checkWinner(newBoard); // Check if the move resulted in a win
//     if (winnerPlayer) {
//       setWinner(winnerPlayer); // Set the winner
//     } else if (isDraw(newBoard)) {
//       setWinner("draw"); // Set the game as a draw
//     } else {
//       setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Switch players
//     }
//   };

//   // Reset the game
//   const resetGame = () => {
//     setBoard(Array(9).fill(""));
//     setCurrentPlayer("X");
//     setWinner(null);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-8">Tic-Tac-Toe</h1>
//       <div className="grid grid-cols-3 gap-2">
//         {board.map((cell, index) => (
//           <div
//             key={index}
//             className="w-24 h-24 flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
//             onClick={() => handleMove(index)}
//           >
//             <span className="text-2xl font-bold">{cell}</span>
//           </div>
//         ))}
//       </div>
//       {winner && (
//         <div className="mt-8 text-xl font-semibold">
//           {winner === "draw" ? "It's a draw!" : `Player ${winner} wins!`}
//         </div>
//       )}
//       <button
//         className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
//         onClick={resetGame}
//       >
//         Reset Game
//       </button>
//     </div>
//   );
// }
// export default App;

import { useState, useEffect } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill("")); // Initialize the game board
  const [currentPlayer, setCurrentPlayer] = useState("X"); // Current player (X or O)
  const [winner, setWinner] = useState(null); // Winner of the game

  // Check if a player has won
  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning player (X or O)
      }
    }
    return null; // No winner
  };

  // Check if the game is a draw
  const isDraw = (board) => {
    return board.every((cell) => cell !== "") && !checkWinner(board);
  };

  // Handle a player's move
  const handleMove = (index) => {
    if (board[index] || winner) return; // If the cell is already filled or the game is over, do nothing

    const newBoard = [...board];
    newBoard[index] = currentPlayer; // Update the board with the current player's move
    setBoard(newBoard);

    const winnerPlayer = checkWinner(newBoard); // Check if the move resulted in a win
    if (winnerPlayer) {
      setWinner(winnerPlayer); // Set the winner
    } else if (isDraw(newBoard)) {
      setWinner("draw"); // Set the game as a draw
    } else {
      setCurrentPlayer("O"); // Switch to AI's turn
    }
  };

  // // AI makes a random move
  // const makeAIMove = () => {
  //   const emptyCells = board
  //     .map((cell, index) => (cell === "" ? index : null))
  //     .filter((index) => index !== null); // Get all empty cells

  //   if (emptyCells.length > 0) {
  //     const randomIndex =
  //       emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Pick a random empty cell
  //     const newBoard = [...board];
  //     newBoard[randomIndex] = "O"; // AI makes its move
  //     setBoard(newBoard);

  //     const winnerPlayer = checkWinner(newBoard); // Check if the move resulted in a win
  //     if (winnerPlayer) {
  //       setWinner(winnerPlayer); // Set the winner
  //     } else if (isDraw(newBoard)) {
  //       setWinner("draw"); // Set the game as a draw
  //     } else {
  //       setCurrentPlayer("X"); // Switch back to the player's turn
  //     }
  //   }
  // };

  // Minimax algorithm for AI
  const minimax = (board, depth, isMaximizing) => {
    const winnerPlayer = checkWinner(board);

    if (winnerPlayer === "O") return 10 - depth; // AI wins
    if (winnerPlayer === "X") return depth - 10; // Player wins
    if (isDraw(board)) return 0; // Draw

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // AI makes the best move using Minimax
  const makeAIMove = () => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        const score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    if (bestMove !== null) {
      const newBoard = [...board];
      newBoard[bestMove] = "O";
      setBoard(newBoard);

      const winnerPlayer = checkWinner(newBoard);
      if (winnerPlayer) {
        setWinner(winnerPlayer);
      } else if (isDraw(newBoard)) {
        setWinner("draw");
      } else {
        setCurrentPlayer("X");
      }
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  // Automatically trigger AI's move when it's AI's turn
  useEffect(() => {
    if (currentPlayer === "O" && !winner) {
      setTimeout(makeAIMove, 500); // Add a small delay for better UX
    }
  }, [currentPlayer, winner]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-24 h-24 flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleMove(index)}
          >
            <span className="text-2xl font-bold">{cell}</span>
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-8 text-xl font-semibold">
          {winner === "draw" ? "It's a draw!" : `Player ${winner} wins!`}
        </div>
      )}
      <button
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
