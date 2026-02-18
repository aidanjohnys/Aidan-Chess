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
            child.remove();
        }
    }

    event.currentTarget.appendChild(chessPiece);
    chessPiece.classList.remove('active-chess-piece');
}
