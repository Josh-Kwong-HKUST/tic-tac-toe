import '../css/styles.css';
import {useState} from 'react';

export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
function Board({xIsNext, squares, onPlay}){
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    function HandleClick(i){
        const newSquares = squares.slice();
        if (newSquares[i] || winner)  return;
        newSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(newSquares);
    }
    return (<>
        <div className="status">{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={()=>HandleClick(0)}/>
            <Square value={squares[1]} onSquareClick={()=>HandleClick(1)}/>
            <Square value={squares[2]} onSquareClick={()=>HandleClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={()=>HandleClick(3)}/>
            <Square value={squares[4]} onSquareClick={()=>HandleClick(4)}/>
            <Square value={squares[5]} onSquareClick={()=>HandleClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={()=>HandleClick(6)}/>
            <Square value={squares[7]} onSquareClick={()=>HandleClick(7)}/>
            <Square value={squares[8]} onSquareClick={()=>HandleClick(8)}/>
        </div>
    </>);
}

function Square({value, onSquareClick}){
    return <button className="square" onClick={onSquareClick}>{value}</button>
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}