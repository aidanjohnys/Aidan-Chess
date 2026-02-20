export class ChessPiece {
    constructor(color, type, position) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.isActive = false;

        this.element = document.createElement('div');
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    onClick(event) {
        const activeChessPieces = document.querySelectorAll('.active-chess-piece').length;

        if (activeChessPieces < 1) {
            event.currentTarget.classList.toggle('active-chess-piece');
            this.isActive = true;
        }

        else {
            event.currentTarget.classList.remove('active-chess-piece')
            this.isActive = false;
        }

    }
}
