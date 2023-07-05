import {useState} from "react";
import './App.scss'

function Square({value, onSquareClick}) {
    return (
        <button className="board__square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default function Board() {
    const [xIsNext, setIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [gameOver, setGameOver] = useState(false);
    const [isDraw, setIsDraw] = useState(false)

    const winner = calculateWinner(squares);
    let status;
    if (gameOver) {
        if (isDraw) {
            status = 'Draw';
        } else {
            status = 'Winner: ' + winner;
        }
    } else if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    function handleClick(i) {
        if (gameOver || squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        setSquares(nextSquares);
        setIsNext(!xIsNext);

        if (calculateWinner(nextSquares)) {
            setGameOver(true);
        } else if (nextSquares.every(square => square !== null)) {
            setIsDraw(true);
            setGameOver(true);
        }
    }

    function restartGame() {
        setSquares(Array(9).fill(null));
        setIsNext(true);
        setGameOver(false);
        setGameOver(false);
        setIsDraw(false);
    }

    return (
        <>
            <div className="container">
                <div className="status__box">
                    <div className="status__X">X</div>
                    <div className="status">{status}</div>
                    <div className="status__O">O</div>
                </div>
                <div className="board">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
                </div>
                <div className="board">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
                </div>
                <div className="board">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
                </div>
                <button className='button-19' onClick={restartGame}>Restart</button>
            </div>
        </>
    );
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
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
