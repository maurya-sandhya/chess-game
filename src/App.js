import React, { useState } from 'react';
import './App.css';

const ChessGame = () => {
  const initialBoard = Array(8)
    .fill(null)
    .map((_, row) =>
      Array(8).fill('').map((_, col) => {
        const pieces = {
          0: ['♜','♞','♝','♛','♚','♝','♞','♜'],
          1: Array(8).fill('♟'),
          6: Array(8).fill('♙'),
          7: ['♖','♘','♗','♕','♔','♗','♘','♖']
        };
        return pieces[row] ? pieces[row][col] : '';
      })
    );

  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);

  const handleSquareClick = (row, col) => {
    if (selected) {
      const newBoard = board.map((r) => r.slice());
      newBoard[row][col] = board[selected.row][selected.col];
      newBoard[selected.row][selected.col] = '';
      setBoard(newBoard);
      setSelected(null);
    } else {
      if (board[row][col] !== '') {
        setSelected({ row, col });
      }
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.chessboard}>
        {board.map((rowData, row) =>
          rowData.map((piece, col) => {
            const isWhite = (row + col) % 2 === 0;
            const isSelected = selected && selected.row === row && selected.col === col;
            return (
              <div
                key={`${row}-${col}`}
                onClick={() => handleSquareClick(row, col)}
                style={{
                  ...styles.square,
                  backgroundColor: isWhite ? '#ffffff' : '#000000',
                  color: isWhite ? '#000000' : '#ffffff',
                  border: isSelected ? '4px solid red' : '1px solid transparent',
                  boxSizing: 'border-box'
                }}
              >
                {piece}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const styles = {
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backgroundImage: 'url(https://media.gettyimages.com/id/1365564618/video/chess-game-king-attack-king.jpg?s=640x640&k=20&c=fdSgBdV6Afb9mHhho0cSepI9z_6G7veJGVCth2DSo1Y=)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  chessboard: {
    width: 480,
    height: 480,
    display: 'flex',
    flexWrap: 'wrap',
    boxShadow: '0 30px 30px rgba(127, 238, 127, 0.5)',
    // border: '2px solid white'
  },
  square: {
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 32,
    cursor: 'pointer',
    userSelect: 'none'
  }
};

export default ChessGame;
