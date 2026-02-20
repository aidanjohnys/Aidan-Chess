export function ChessPiece(color, type, position) {
    this.color = color;
    this.type = type;
    this.position = position;
    this.isActive = false;
    this.element = document.createElement('div');
    this.element.addEventListener('click', onClick);

    function onClick(event) {
        const activeChessPieces = document.querySelectorAll('.active-chess-piece').length;

        if (activeChessPieces < 1) {
            event.currentTarget.classList.toggle('active-chess-piece');
        }

        else {
            event.currentTarget.classList.remove('active-chess-piece')
        }

    }
}
