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

ChessPiece.prototype.updateState = function() {
    this.element.classList.toggle('active-chess-piece', this.isActive);

    if (this.isActive) {
        this.legalMoves = [];

        for (let relativeMove of this.getLegalMoves(this.type)) {
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

        // Filter out occupied squares
        const occupiedSquares = [];
        for (const piece of this.chessPieces) {
            occupiedSquares.push(piece.position);
        }
        this.legalMoves = this.legalMoves.filter(move => !occupiedSquares.includes(move));
    }

    if (this.isCaptured) {
        this.element.remove();
        return;
    }


    const square = document.querySelector(`#${this.position}`);
    square.append(this.element);
}

ChessPiece.prototype.getLegalMoves = function() {
    const pawnRelativeMoves = [[0,1], [0,2]];
    const knightRelativeMoves = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];

    if (this.type === 'pawn') {
        if (this.color === 'Black') {
            for (let i = 0; i < pawnRelativeMoves.length; i++) {
                pawnRelativeMoves[i][1] = -pawnRelativeMoves[i][1];
            }
        }
    }

    if (this.type === 'knight') {
        if (this.color === 'Black') {
            for (let i = 0; i < knightRelativeMoves.length; i++) {
                knightRelativeMoves[i][1] = -knightRelativeMoves[i][1];
            }
        }
    }

    if (this.type === 'bishop') {
        const moves = [];
        for (let i = 1; i < 8; i++) {
            moves.push([i, i]);
            moves.push([-i, -i]);
            moves.push([i, -i]);
            moves.push([-i, i]);
        }

        return moves;
    }

    if (this.type === 'queen') {
        const moves = [];
        for (let i = 1; i < 8; i++) {
            moves.push([i, i]);
            moves.push([-i, -i]);
            moves.push([i, -i]);
            moves.push([-i, i]);
            moves.push([0, i]);
            moves.push([0, -i]);
            moves.push([i, 0]);
            moves.push([-i, 0]);
        }

        return moves;
    }

    if (this.type === 'king') {
        const moves = [];
        for (let i = 1; i < 2; i++) {
            moves.push([i, i]);
            moves.push([-i, -i]);
            moves.push([i, -i]);
            moves.push([-i, i]);
            moves.push([0, i]);
            moves.push([0, -i]);
            moves.push([i, 0]);
            moves.push([-i, 0]);
        }

        return moves;
    }
}
