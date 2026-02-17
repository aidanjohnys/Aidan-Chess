const chessPieces = document.querySelectorAll('.chess-piece');
for (const piece of chessPieces) {
    piece.addEventListener('click', clickedChessPiece);
}

function clickedChessPiece(event) {
    console.log(event)
}
