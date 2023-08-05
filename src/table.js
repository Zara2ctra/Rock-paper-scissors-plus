import readline from "readline";

export class Table {
    constructor(moves) {
        this.moves = moves
    }

    getUserMoveIndex() {
        const inputMove = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return this.checkAnswer(inputMove)
    }

    async checkAnswer(inputMove) {
        return new Promise(resolve => {
            inputMove.question("Enter your move: ", answer => {
                inputMove.close();
                answer = answer.trim();

                if (answer === '?') {
                    this.printHelp(answer, resolve)
                } else if (answer === '0'){
                    inputMove.close();
                }else {
                    const index = parseInt(answer);
                    if (index >= 0 && index <= this.moves.length) {
                        resolve(index);
                    } else {
                        this.printInvalidMove(resolve)
                    }
                }
            });
        });
    }

    printHelp(answer, resolve) {
        console.log("Available moves:");
        this.printAvailableMoves(this.moves);
        this.getUserMoveIndex().then(resolve);
    }

    printInvalidMove(resolve) {
        console.log("Invalid move. Enter '?' for help.");
        this.getUserMoveIndex().then(resolve);
    }

    printAvailableMoves(moves) {
        moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
        console.log("0 - exit");
        console.log("? - help");
    }
}
