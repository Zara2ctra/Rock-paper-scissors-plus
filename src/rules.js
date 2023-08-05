export class Rules {
    constructor(moves) {
        this.moves = moves;
        this.uniqueMoves = [...new Set(this.moves)]
    }

    checkCorrectInput() {
        if (this.moves.length%2 === 0) {
            throw Error("The number of arguments must be odd")
        } else if (this.moves.length !== this.uniqueMoves.length) {
            throw Error("All arguments must be unique")
        } else if (this.moves.length < 3) {
            throw Error("The number of moves must be greater than two")
        }
    }
}