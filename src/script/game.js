import {generate_board} from "./generate_board.js";
import {pieceLetter} from "./chess_piece.js";

export function Game() {
    // Programmatically generate the chess board
    this.chessPieces = generate_board();
    this.turn = piece_color.WHITE;
    this.movesList = document.querySelector("#moves-list");

    this.squares = document.querySelectorAll('.square');
    for (const square of this.squares) {
        square.addEventListener('click', this.clickedSquare.bind(this));
    }

    this.updateState();
}

export const piece_color = Object.freeze({
   WHITE: "white",
   BLACK: "black",
});

Game.prototype.clickedSquare = function (event) {
    const capturedChessPiece = this.chessPieces.find((element) => element.position === event.currentTarget.id);
    const activeChessPiece = this.chessPieces.find((element) => element.isActive === true);

    console.log('captured:', capturedChessPiece);
    console.log('active:', activeChessPiece);

    // Clicked on an empty square?
    const isCapturing = capturedChessPiece !== undefined;

    // Either a random click or wanting to activate a chess piece
    if (activeChessPiece === undefined) {

        // Ignore random click on the board
        if (!isCapturing) {
            return;
        }

        // Activate piece
        if (capturedChessPiece.color === this.turn) {
            capturedChessPiece.isActive = true;
            capturedChessPiece.updateState();
            showLegalMoves(capturedChessPiece.legalMoves);
        }

        return;
    }

    // User wants to deactivate a piece
    if (activeChessPiece === capturedChessPiece) {
        activeChessPiece.isActive = false;
        activeChessPiece.updateState();
        showLegalMoves([]);
        return;
    }

    if (isCapturing) {
        // Can't capture your own piece
        // todo: might not require this if only legal moves are allowed
        if (capturedChessPiece.color === activeChessPiece.color) {
            return;
        }

        // Remove chess piece from board
        capturedChessPiece.isCaptured = true;
        capturedChessPiece.updateState();
        const index = this.chessPieces.indexOf(capturedChessPiece);
        this.chessPieces.splice(index, 1);
    }

    const oldPosition = activeChessPiece.position;
    // Give chess piece a new position
    activeChessPiece.position = event.currentTarget.id;
    activeChessPiece.isActive = false;
    activeChessPiece.updateState();
    this.updatePlayedMoves(activeChessPiece, isCapturing, oldPosition);
    showLegalMoves([]);
    this.turn = this.turn === piece_color.WHITE ? piece_color.BLACK : piece_color.WHITE;
    this.updateState();
}

Game.prototype.updateState = function() {
    const pieceColorIndicator = document.querySelector("#piece-color-indicator");
    pieceColorIndicator.textContent = this.turn;
}

Game.prototype.updatePlayedMoves = function(piece, isCapturing, oldPosition) {
    let turn = this.movesList.lastElementChild;

    // First move of game
    if (!turn) {
        turn = document.createElement("li");
        this.movesList.append(turn);
    }

    let thisMove;
    const whiteMove = turn.querySelector(".white-move");
    const blackMove = turn.querySelector(".black-move");

    if (!whiteMove) {
        thisMove = document.createElement("span");
        thisMove.classList.add("white-move");
        turn.append(thisMove);
    }

    else if (!blackMove) {
        thisMove = document.createElement("span");
        thisMove.classList.add("black-move");
        turn.append(thisMove);
    }

    // White and black have already played their turn so make a new move
    else {
        turn = document.createElement("li");
        this.movesList.append(turn);
        thisMove = document.createElement("span");
        thisMove.classList.add("white-move");
        turn.append(thisMove);
    }

    // Make the first char of the position lowercase so it reads better on the screen
    const position = piece.position.toLowerCase();
    const capturing = isCapturing ? "x" : "";
    let originalFile = "";

    if (capturing && piece.type === "pawn") {
        originalFile = oldPosition[0].toLowerCase();
    }

    thisMove.textContent = originalFile + pieceLetter.get(piece.type) + capturing + position + "\u00A0";
    turn.append(thisMove);
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
