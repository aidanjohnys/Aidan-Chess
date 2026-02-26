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

        if (this.type === 'pawn') {
            const row = parseInt(this.position[1]);
            let newPos;
            newPos = this.position[0] + (row + 1).toString();
            this.legalMoves.push(newPos);
            newPos = this.position[0] + (row + 2).toString();
            this.legalMoves.push(newPos);
        }

    }

    if (this.isCaptured) {
        this.element.remove();
        return;
    }


    const square = document.querySelector(`#${this.position}`);
    square.append(this.element);
}
