import React, {useState,useEffect} from 'react';
import Modal from '@material-ui/core/Modal';

function Board() {
    const [board, setBoard] = useState([[]]); 
    const [winner, setWinner] = useState();
    const [turn, setTurn] = useState(1);
    const [turnsCounter, setTurnsCounter] = useState(0)

    function emptyBoard(){
        const gameBoard = [];
        for(let i = 0; i < 7; i++){
            gameBoard[i] = [null,null,null,null,null,null];
        };
        setBoard(gameBoard);
        setWinner(false);
        setTurnsCounter(0);
    }

    useEffect(() => {
        emptyBoard();
    }, [])

    useEffect(() => {
        setTurnsCounter(turnsCounter + 1);
        if(turnsCounter === 42) {
            setWinner('tie')
        }
    }, [turn])

    const playMove = (columnIndex) => {
        const newBoard = board;
        const newColumn = newBoard[columnIndex];
        for (let i = 0; i < 6; i++) {
            if (newColumn[i] === null) {
                newColumn[i] = `player${turn}`;
                setBoard(newBoard);
                if(turn === 1) {
                    setTurn(2);
                } else {
                    setTurn(1);
                }
                return
            }
        }
    }

    const calculateWinner = () => {
        let c = 0; let s = 0
        while (c < 7) {
            while(s < 6) {
                const square = board[c][s]
                // vertical:
                if(s + 3 < 6) {
                    if (square!==null&&square===board[c][s+1]&&square===board[c][s+2]&&square===board[c][s+3]) {
                        setWinner(square);
                        return
                    }
                }
                // horizontal:
                if(c + 3 < 7) {
                    if (square!==null&&square===board[c+1][s]&&square===board[c+2][s]&&square===board[c+3][s]) {
                        setWinner(square);
                        return
                    }
                }
                // diagonal:

                // up-right:
                if(c < 4 && s < 3) {
                    if (square!==null&&square===board[c+1][s+1]&&square===board[c+2][s+2]&&square===board[c+3][s+3]) {
                        setWinner(square);
                        return 
                    };
                }

                // up-left:
                if(c > 2 && s < 3) {
                    if (square!==null&&square===board[c-1][s+1]&&square===board[c-2][s+2]&&square===board[c-3][s+3]) {
                        setWinner(square);
                        return 
                    };
                }
                s++;
            }
            c++; 
            s=0
        }
    }

  return (
      <>
    <div className="Board">
        {
            board.map((column, columnIndex) => (
                <>
                {columnIndex === 0 && <div className="divider" />} {/* the red column separating each column */}
                <div
                    className="Column"
                    id={`column${columnIndex}`}
                    onClick={()=>{playMove(columnIndex); calculateWinner();}}>
                {
                    column.map((square, squareIndex) => (
                        <div className="Square" id={`square${squareIndex}`}>
                            <div className={square}>

                            </div>
                        </div>
                    ))  
                }
                </div>
                <div className="divider" /> {/* the red column separating each column */}
                </>
            ))
        }
    </div>

            <Modal open={winner ? true : false} onClose={()=> {emptyBoard();}}>
                <div className ='winModal'>
                    <h2>Game Finished !</h2>
                    <h2>{winner ==='tie'? 'A Tie !':`Winner is: player ${winner}`}</h2>
                </div>
            </Modal>
        </>

  );
}


export default Board;
