import {generate_board} from "./generate_board.js";
import {pieceLetter} from "./chess_piece.js";

export function Game() {
    // Programmatically generate the chess board
    this.chessPieces = generate_board();
    this.turn = piece_color.WHITE;
    this.moves = [];
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

function Turn() {
    this.firstMove = null;
    this.secondMove = null;
}

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

    // update position and state
    const oldPosition = activeChessPiece.position;
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

    const movesList = document.querySelector("#moves-list");
    movesList.innerHTML = '';

    for (const turn of this.moves) {
        const listItem = document.createElement("li");
        const firstMove = document.createElement("span");
        const secondMove = document.createElement("span");
        firstMove.textContent = turn.firstMove ?? "";
        secondMove.textContent = turn.secondMove ?? "";
        listItem.appendChild(firstMove);
        listItem.appendChild(secondMove);
        movesList.append(listItem);
    }
}

Game.prototype.updatePlayedMoves = function(piece, isCapturing, oldPosition) {
    // First move of game
    if (this.moves.length <= 0) {
        this.moves.push(new Turn());
    }

    let latestTurn = this.moves[this.moves.length - 1];
    if (latestTurn.firstMove && latestTurn.secondMove) {
        this.moves.push(new Turn());
    }

    const turn = this.moves[this.moves.length - 1];
    // Make the first char of the position lowercase so it reads better on the screen
    const position = piece.position.toLowerCase();
    const capturing = isCapturing ? "x" : "";
    let originalFile = "";

    if (capturing && piece.type === "pawn") {
        originalFile = oldPosition[0].toLowerCase();
    }

    const move =  originalFile + pieceLetter.get(piece.type) + capturing + position + "\u00A0";

    if (!turn.firstMove) {
        turn.firstMove = move;
    }

    else {
        turn.secondMove = move;
    }
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
