export function ChessPiece(color, type, position) {
    this.color = color;
    this.type = type;
    this.position = position;
    this.element = document.createElement('div');
}
