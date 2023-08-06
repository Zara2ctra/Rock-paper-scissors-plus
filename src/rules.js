export class Rules {
    constructor(moves) {
        this.moves = moves;
        this.numElements = moves.length;
        this.computerMove = this.generateComputerMove();
        this.winMatrix = this.createWinMatrix();
    }

    generateComputerMove() {
        return this.moves[Math.floor(Math.random() * this.numElements)];
    }

    createWinMatrix() {
        const winMatrix = [];
        let countDigit = (this.numElements - 1) / 2;
        let firstRow = [0];

        for (let i = 0; i < countDigit; i++) {
            firstRow.push(1);
        }
        for (let i = 0; i < countDigit; i++) {
            firstRow.push(-1);
        }
        winMatrix.push(firstRow);

        for (let i = 1; i < this.numElements; i++) {
            let currentArr = firstRow.slice();
            currentArr.unshift(currentArr.pop());
            let otherArr = currentArr.slice();
            winMatrix.push(otherArr);
            firstRow = currentArr;
        }

        return winMatrix;
    }

    checkGameResult(userMoveIndex, computerMoveIndex) {
        let result = this.winMatrix[userMoveIndex][computerMoveIndex];
        if (result === 1) {
            return "You win!";
        } else if (result === -1) {
            return "Computer wins!";
        } else {
            return "It's a tie!";
        }
    }

    checkCorrectInput() {
        if (this.moves.length%2 === 0) {
            throw new Error("The number of arguments must be odd")
        } else if (this.moves.length !== [...new Set(this.moves)].length) {
            throw new Error("All arguments must be unique")
        } else if (this.moves.length < 3) {
            throw new Error("The number of moves must be greater")
        }
    }
}