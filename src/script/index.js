import {generate_board} from "./generate_board.js";

// Programmatically generate the chess board
const chessPieces = generate_board();

/*
const chessPieces = document.querySelectorAll('.chess-piece');
for (const piece of chessPieces) {
    piece.addEventListener('click', clickedChessPiece);
}

function clickedChessPiece(event) {
    const activeChessPieces = document.querySelectorAll('.active-chess-piece').length;

    if (activeChessPieces < 1) {
        event.currentTarget.classList.toggle('active-chess-piece');
    }

    else {
        event.currentTarget.classList.remove('active-chess-piece')
    }
}

const squares = document.querySelectorAll('.square');
for (const square of squares) {
    square.addEventListener('click', clickedSquare);
}

function clickedSquare(event) {
    const chessPiece = document.querySelector('.active-chess-piece');

    if (event.currentTarget.contains(chessPiece)) {
        return;
    }

    if (chessPiece === null) {
        return;
    }

    for (const child of event.currentTarget.children) {
        if (child.classList.contains('chess-piece')) {
            const childIsWhite = child.classList.contains('white');
            const activePieceIsWhite = chessPiece.classList.contains('white');
            if (childIsWhite === activePieceIsWhite) {
                // Not legal move to capture your own piece
                return;
            }

            child.remove();
        }
    }

    event.currentTarget.appendChild(chessPiece);
    chessPiece.classList.remove('active-chess-piece');
}
*/
