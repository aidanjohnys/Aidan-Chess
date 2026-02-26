export function ChessPiece (color, type, position) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.isActive = false;
        this.isCaptured = false;

        this.element = document.createElement('div');
}

ChessPiece.prototype.updateState = function() {
    this.element.classList.toggle('active-chess-piece', this.isActive);

    if (this.isCaptured) {
        this.element.remove();
        return;
    }


    const square = document.querySelector(`#${this.position}`);
    square.append(this.element);
}
