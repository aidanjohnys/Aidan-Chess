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
    debugger;

    if (this.type === 'pawn') {
        // is on starting square? move forward two
        if (this.position[1] === '2' && this.color === 'white') {
            let absoluteMove = this.getAbsoluteMove([0, 2]);
            if (!this.getOccupiedSquare(absoluteMove)) {
                this.legalMoves.push(absoluteMove);
            }
        }

        else if (this.position[1] === '7' && this.color === 'black') {
            let absoluteMove = this.getAbsoluteMove([0, -2]);
            if (!this.getOccupiedSquare(absoluteMove)) {
                this.legalMoves.push(absoluteMove);
            }
        }

        // Move forward 1 square
        let forwardOne;
        if (this.color === 'white') {
            forwardOne = this.getAbsoluteMove([0, 1]);
        }

        else {
            forwardOne = this.getAbsoluteMove([0, -1]);
        }

        if (forwardOne !== false) {
            const occupiedSquare = this.getOccupiedSquare(forwardOne);
            if (occupiedSquare === null) {
                this.legalMoves.push(forwardOne);
            }
        }

        // Left Capture
        let leftCapture;
        if (this.color === 'white') {
            leftCapture = this.getAbsoluteMove([-1, 1])
        }

        else {
            leftCapture = this.getAbsoluteMove([-1, -1])
        }

        if (leftCapture !== false) {
            const occupiedSquare = this.getOccupiedSquare(leftCapture);
            if (occupiedSquare !== null && occupiedSquare.color !== this.color) {
                this.legalMoves.push(leftCapture);
            }
        }

        // Right Capture
        let rightCapture;
        if (this.color === 'white') {
            rightCapture = this.getAbsoluteMove([1, 1])
        }

        else {
            rightCapture = this.getAbsoluteMove([1, -1])
        }

        if (rightCapture !== false) {
            const occupiedSquare = this.getOccupiedSquare(rightCapture);
            if (occupiedSquare !== null && occupiedSquare.color !== this.color) {
                this.legalMoves.push(rightCapture);
            }
        }

        return;
    }

    if (this.type === 'knight') {
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

        return;
    }
}

ChessPiece.prototype.getAbsoluteMove = function(relativeMove) {
    let absoluteMove;
    const row = String.fromCharCode(this.position[0].charCodeAt(0) + relativeMove[0]);
    const col = (parseInt(this.position[1]) + relativeMove[1]).toString();
    absoluteMove = row + col;

    if (row < 'A' || row > 'H') {
        return false;
    }

    if (col < 1 || col > 8) {
        return false;
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
