// Generate square IDs eg: C7, D4

const boardSquares = [...document.querySelectorAll('.square')];
boardSquares.reverse();

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        let index = (row * 8) + (col % 8)
        let colIndex = 7 - col;
        let colLetter = String.fromCharCode(colIndex + 'A'.charCodeAt(0));
        let id = `${colLetter}${row + 1}`;
        boardSquares[index].setAttribute('id', id);
    }
}

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
