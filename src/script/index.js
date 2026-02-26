import {generate_board} from "./generate_board.js";

// Programmatically generate the chess board
let chessPieces = generate_board();

const squares = document.querySelectorAll('.square');
for (const square of squares) {
    square.addEventListener('click', clickedSquare);
}

function clickedSquare(event) {
    const capturedChessPiece = chessPieces.find((element) => element.position === event.currentTarget.id);
    const activeChessPiece = chessPieces.find((element) => element.isActive === true);

    console.log('captured:', capturedChessPiece);
    console.log('active:', activeChessPiece);

    // User wants to deactivate a piece
    if (activeChessPiece === capturedChessPiece) {
        activeChessPiece.isActive = false;
        activeChessPiece.updateState();
        showLegalMoves([]);
        return;
    }

    // Clicked on an empty square?
    const isCapturing = capturedChessPiece !== undefined;

    // Either a random click or wanting to activate a chess piece
    if (activeChessPiece === undefined) {

        // Ignore random click on the board
        if (!isCapturing) {
            return;
        }

        // Activate piece
        capturedChessPiece.isActive = true;
        capturedChessPiece.updateState();
        showLegalMoves(capturedChessPiece.legalMoves);
        return;
    }

    if (isCapturing) {
        // Can't capture your own piece
        if (capturedChessPiece.color === activeChessPiece.color) {
            return;
        }

        // Remove chess piece from board
        capturedChessPiece.isCaptured = true;
        capturedChessPiece.updateState();
        chessPieces = chessPieces.filter(piece => piece !== capturedChessPiece);
    }

    // Give chess piece a new position
    activeChessPiece.position = event.currentTarget.id;
    activeChessPiece.isActive = false;
    activeChessPiece.updateState();
    showLegalMoves([]);
}

function showLegalMoves(legalMoves) {
    const moveMarkers = document.querySelectorAll('.legal-move-marker');
    moveMarkers.forEach(element => {
        element.remove()
    });

    for (const move of legalMoves) {
        const square = document.querySelector(`#${move}`);
        const moveMarker = document.createElement('div');
        moveMarker.classList.add('legal-move-marker');
        const img = document.createElement('img');
        img.src = 'asset/legal_move_marker.png';
        img.alt = 'Legal Move Marker';
        moveMarker.append(img);
        square.append(moveMarker);
    }
}
