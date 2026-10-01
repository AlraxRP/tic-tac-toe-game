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
            if(board[row][column].getValue() == 0)
            {
                board[row][column].setToken(player);
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

function Gamecontroller(player1="A",player2="B")
{
    const board = Gameboard();

    const players = [
        {name: player1,token: 1},
        {name: player2,token: 2}
    ];

    let currentPlayer = players[0];

    const getCurrentPlayer = () =>
    {
        return currentPlayer;
    }

    const switchPlayer = () =>
    {
        currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    }

    const printNewRound = () =>
    {
        console.log(`Player ${currentPlayer.name} turn`);
        board.printBoard();
    }

    const checkWinner = (row,column,player) =>
    {
        const totalRows = board.getBoard().length;
        const toralColumns = board.getBoard()[0].length;

        const horizontal = board.getBoard()[row];
        if(horizontal.every((cell) => cell.getValue() == player)) return true;

        const vertical = [];
        for(let i = 0; i < totalRows; i++)
        {
            vertical.push(board.getBoard()[i][column]);
        }
        if(vertical.every((cell) => cell.getValue() == player)) return true;


        const diagonalLeft = [];
        for(let i = 0; i < totalRows; i++)
        {
            diagonalLeft.push(board.getBoard()[i][i]);
        }
        if(diagonalLeft.every((cell) => cell.getValue() == player)) return true;

        const diagonalRight = [];
        for(let i = 0; i < totalRows; i++)
        {
            diagonalRight.push(board.getBoard()[i][toralColumns - 1 - i]);
        }
        if(diagonalRight.every((cell) => cell.getValue() == player)) return true;

        return false;

    }

    const checkDraw = () =>
    {
        const allCellsOcupy = board.getBoard().every((row) => row.every((cell) => cell.getValue() != 0));

        if(allCellsOcupy) return true;
        return false;
    }

    const playRound = (row,column) =>
    {
        let success = board.addToken(row,column,currentPlayer.token);

        if(success)
        {
            if(checkWinner(row,column,currentPlayer.token))
            {
                console.log(`Player ${currentPlayer.name} wins!`);
                board.printBoard();
                return true;
            }
            
            if(checkDraw())
            {
                console.log("It's a draw");
                board.printBoard();
                return true;
            }

            printNewRound();
            switchPlayer();
        }
        return false;
    }

    printNewRound();

    return({getCurrentPlayer,playRound, getBoard: board.getBoard});
}

function ScreenController()
{
    const game = Gamecontroller();
    const playerTurnText = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () =>
    {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const currentPlayer = game.getCurrentPlayer();

        playerTurnText.textContent = `Player ${currentPlayer.name} turn`;

        board.forEach((row,indexRow) => {
            row.forEach((cell,indexCol) => {
                const cellBtn = document.createElement("button");
                cellBtn.classList.add("cell");
                cellBtn.dataset.row = indexRow;
                cellBtn.dataset.column = indexCol;
                cellBtn.textContent = cell.getValue();
                
                boardDiv.appendChild(cellBtn);

            });
        });
    }

    function clickHandlerBoard(e)
    {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if(!selectedRow) return;

        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
}

ScreenController();