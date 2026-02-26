export function ChessPiece (color, type, position) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.isActive = false;
        this.isCaptured = false;
        this.legalMoves = [];
        this.element = document.createElement('div');
}

ChessPiece.prototype.updateState = function() {
    this.element.classList.toggle('active-chess-piece', this.isActive);

    if (this.isActive) {
        this.legalMoves = [];

        for (let relativeMove of getLegalMoves(this.type)) {
            if (this.color === 'black') {
                // Negate the relative row as black moves in the opposite direction
                relativeMove[1] = -relativeMove[1];
            }

            let absoluteMove;
            const row = String.fromCharCode(this.position[0].charCodeAt(0) + relativeMove[0]);
            const col = (parseInt(this.position[1]) + relativeMove[1]).toString();
            absoluteMove = row + col;

            if (row < 'A' || row > 'H') {
                continue;
            }

            if (col < 1 || col > 8) {
                continue;
            }

            this.legalMoves.push(absoluteMove);
        }
    }

    if (this.isCaptured) {
        this.element.remove();
        return;
    }


    const square = document.querySelector(`#${this.position}`);
    square.append(this.element);
}

function getLegalMoves(piece) {
    if (piece === 'pawn') {
        return [[0,1], [0,2]];
    }

    if (piece === 'knight') {
        return [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
    }

    return [];
}
