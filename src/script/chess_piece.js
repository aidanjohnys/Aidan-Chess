export function ChessPiece (color, type, position, chessPieces) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.isActive = false;
        this.isCaptured = false;
        this.legalMoves = [];
        this.element = document.createElement('div');
        this.chessPieces = chessPieces;
}

const directions = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    UPLEFT: 4,
    UPRIGHT: 5,
    DOWNLEFT: 6,
    DOWNRIGHT: 7
});

const directionRelativeMoveWhite = new Map ([
    [directions.UP, [0, 1]],
    [directions.DOWN, [0, -1]],
    [directions.LEFT, [-1, 0]],
    [directions.RIGHT, [1, 0]],
    [directions.UPLEFT, [-1, 1]],
    [directions.UPRIGHT, [1, 1]],
    [directions.DOWNLEFT, [-1, -1]],
    [directions.DOWNRIGHT, [1, -1]]
]);

const directionRelativeMoveBlack = new Map ([
    [directions.UP, [0, -1]],
    [directions.DOWN, [0, 1]],
    [directions.LEFT, [1, 0]],
    [directions.RIGHT, [-1, 0]],
    [directions.UPLEFT, [1, -1]],
    [directions.UPRIGHT, [-1, -1]],
    [directions.DOWNLEFT, [1, 1]],
    [directions.DOWNRIGHT, [-1, 1]]
]);

const MAX_DISTANCE = 7;

ChessPiece.prototype.updateState = function() {
    this.element.classList.toggle('active-chess-piece', this.isActive);

    if (this.isActive) {
        this.updateLegalMoves();
    }

    if (this.isCaptured) {
        this.element.remove();
        return;
    }

    const square = document.querySelector(`#${this.position}`);
    square.append(this.element);
}

ChessPiece.prototype.updateLegalMoves = function() {
    this.legalMoves = [];

    if (this.type === 'pawn') {
        // todo: add en-passant
        const pushOne = this.getLegalMovesInDirection(directions.UP, 1)[0];
        if (pushOne && !this.getOccupiedSquare(pushOne)) {
            this.legalMoves.push(pushOne);
        }

        if (isOnStartingSquare(this.position[1], this.color)) {
            this.legalMoves.push(this.getLegalMovesInDirection(directions.UP, 2)[1]);
        }

        // Left Capture
        const leftCapture = this.getLegalMovesInDirection(directions.UPLEFT, 1)[0];
        if (leftCapture) {
            let occupiedSquare = this.getOccupiedSquare(leftCapture);
            if (occupiedSquare && occupiedSquare.color !== this.color) {
                this.legalMoves.push(leftCapture);
            }
        }

        // Right Capture
        const rightCapture = this.getLegalMovesInDirection(directions.UPRIGHT, 1)[0];
        if (rightCapture) {
            let occupiedSquare = this.getOccupiedSquare(rightCapture);
            if (occupiedSquare && occupiedSquare.color !== this.color) {
                this.legalMoves.push(rightCapture);
            }
        }
    }

    else if (this.type === 'knight') {
        const knightRelativeMoves = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
        for (const relativeMove of knightRelativeMoves) {
            let absoluteMove = this.getAbsoluteMove(relativeMove);

            if (!absoluteMove) {
                continue;
            }

            let occupiedSquare = this.getOccupiedSquare(absoluteMove);
            if (occupiedSquare && occupiedSquare.color === this.color) {
                continue;
            }

            this.legalMoves.push(absoluteMove);
        }
    }

    else if (this.type === 'bishop') {
        this.legalMoves.push(...[
            directions.UPLEFT,
            directions.UPRIGHT,
            directions.DOWNLEFT,
            directions.DOWNRIGHT
        ].map((x) => this.getLegalMovesInDirection(x, MAX_DISTANCE)).flat());
    }

    else if (this.type === 'rook') {
        this.legalMoves.push(...[
            directions.UP,
            directions.DOWN,
            directions.LEFT,
            directions.RIGHT
        ].map((x) => this.getLegalMovesInDirection(x, MAX_DISTANCE)).flat());
    }

    else if (this.type === 'queen') {
        this.legalMoves.push(...[
            directions.UP,
            directions.DOWN,
            directions.LEFT,
            directions.RIGHT,
            directions.UPLEFT,
            directions.UPRIGHT,
            directions.DOWNLEFT,
            directions.DOWNRIGHT
        ].map((x) => this.getLegalMovesInDirection(x, MAX_DISTANCE)).flat());
    }

    else if (this.type === 'king') {
        this.legalMoves.push(...[
            directions.UP,
            directions.DOWN,
            directions.LEFT,
            directions.RIGHT,
            directions.UPLEFT,
            directions.UPRIGHT,
            directions.DOWNLEFT,
            directions.DOWNRIGHT
        ].map((x) => this.getLegalMovesInDirection(x, 1)).flat());
    }

}

ChessPiece.prototype.getAbsoluteMove = function(relativeMove) {
    let absoluteMove;
    const row = String.fromCharCode(this.position[0].charCodeAt(0) + relativeMove[0]);
    const col = (parseInt(this.position[1]) + relativeMove[1]).toString();
    absoluteMove = row + col;

    if (row < 'A' || row > 'H') {
        return null;
    }

    if (col < 1 || col > 8) {
        return null;
    }

    return absoluteMove;
}

ChessPiece.prototype.getOccupiedSquare = function(position) {
    for (const piece of this.chessPieces) {
        if (piece.position === position) {
            return piece;
        }
    }

    return null;
}

ChessPiece.prototype.getLegalMovesInDirection = function(direction, distance) {
    const moves = [];

    let relativeMove;
    if (this.color === 'white') {
        relativeMove = directionRelativeMoveWhite.get(direction);
    }

    else {
        relativeMove = directionRelativeMoveBlack.get(direction);
    }

    for (let i = 0; i < distance; i++) {
        let relativeMovePlusDistance = [...relativeMove];
        relativeMovePlusDistance[0] += (relativeMove[0] * i);
        relativeMovePlusDistance[1] += (relativeMove[1] * i);

        let move = this.getAbsoluteMove(relativeMovePlusDistance);

        if (!move) {
            break;
        }

        const occupiedSquare = this.getOccupiedSquare(move);
        if (occupiedSquare) {
            // Allow capture of blocking piece but no further
            if (occupiedSquare.color !== this.color) {
                moves.push(move);
            }

            break;
        }

        moves.push(move);
    }

    return moves;
}

function isOnStartingSquare(rank, color) {
    if (color === 'black' && rank === '7') {
        return true;
    }

    return color === 'white' && rank === '2';
}
