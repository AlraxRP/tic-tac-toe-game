function Gameboard()
{
    const column = 3;
    const row = 3;
    const board = [];
    
    for(let i = 0; i < row; i++)
    {
        board[i] = [];
        for(let j = 0; j < column; j++)
        {
            board[i].push(Cell());
        }
    }

    const getBoard = () =>
    {
        return board;
    }

    const addToken = (row,column,player) =>
    {
        if(row > -1 && row < 3 && column > -1 && column < 3)
        {
            if(board[row][column].getValue == 0)
            {
                board[row][column].setToken = player;
                return true;
            }
        }
        return false;
    }

    const printBoard = () =>
    {
        const boardValues = board.map((row) => 
            row.map((cell) => cell.getValue())
        );
        console.log(boardValues);
    }

    return ({getBoard,addToken,printBoard});
}

function Cell()
{
    let value = 0;

    const setToken = (player) =>
    {
        value = player;
    }

    const getValue = () =>
    {
        return value;
    }

    return({setToken,getValue});
}

const game = Gameboard();

console.log(game.printBoard());