import {ChessPiece} from "./chess_piece.js";

export function generate_board() {
    const chessBoard = document.querySelector('#chess-board');

    for (let row = 8; row >= 0; row--) {
        let boardRow = document.createElement('div');
        boardRow.classList.add('board-row');
        boardRow.id = `row-${row}`;
        chessBoard.append(boardRow);

        if (row === 0) {
            for (let col = 0; col < 8; col++) {
                let markerSquare = document.createElement('div');
                markerSquare.classList.add('marker-square');
                boardRow.append(markerSquare);
            }

            continue;
        }

        for (let col = 0; col < 8; col++) {
            let square = document.createElement('div');
            square.classList.add('square');

            let colLetter = String.fromCharCode(col + 'A'.charCodeAt(0));
            let id = `${colLetter}${row}`;
            square.setAttribute('id', id);

            boardRow.append(square);

        }

        let markerSquare = document.createElement('div');
        markerSquare.classList.add('marker-square');
        boardRow.append(markerSquare);
    }

    // Setup Chess Board
    const layout = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    const chessPieces = [];

    // Create Major Pieces
    ['black', 'white'].forEach((color, rowIndex) => {
        for (let col = 0; col < 8; col++) {
            const squareLetter = String.fromCharCode(col + 'A'.charCodeAt(0));
            const row = rowIndex === 0 ? 8 : 1;
            const position = `${squareLetter}${row}`;
            const square = document.querySelector(`#${position}`);
            const piece = layout[col];

            const chessPiece = new ChessPiece(color, piece, position)
            chessPiece.element.classList.add('chess-piece', color);
            square.append(chessPiece.element);

            const img = document.createElement('img');
            img.src = `asset/${color}_${piece}.png`;
            img.alt = `${color} ${piece}`;

            chessPiece.element.append(img);
            chessPieces.push(chessPiece);
        }
    });

    // Create Pawns
    ['black', 'white'].forEach((color, rowIndex) => {
        for (let col = 0; col < 8; col++) {
            const squareLetter = String.fromCharCode(col + 'A'.charCodeAt(0));
            const row = rowIndex === 0 ? 7 : 2;
            const position = `${squareLetter}${row}`;
            const square = document.querySelector(`#${position}`);
            const piece = layout[col];

            const chessPiece = new ChessPiece(color, piece, position)
            chessPiece.element.classList.add('chess-piece', color);
            square.append(chessPiece.element);

            const img = document.createElement('img');
            img.src = `asset/${color}_pawn.png`;
            img.alt = `${color} ${piece}`;

            chessPiece.element.append(img);
            chessPieces.push(chessPiece);
        }
    });

    return chessPieces;
}
