import readline from "readline";
import { table } from 'table';
import {winMatrix} from "./app.js";

export class Table {
    constructor(moves) {
        this.moves = moves
        this.numMoves = this.moves.length;
    }

    async getUserMoveIndex() {
        const inputMove = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return await this.checkAnswer(inputMove)
    }

    async checkAnswer(inputMove) {
        return new Promise(resolve => {
            inputMove.question("Enter your move: ", answer => {
                inputMove.close()
                answer = answer.trim();

                if (answer === '?') {
                    this.printHelp(resolve);
                } else if (answer === '0'){
                    inputMove.close();
                }else {
                    const index = parseInt(answer);
                    if (index >= 0 && index <= this.numMoves) {
                        resolve(index);
                        inputMove.close();
                    } else {
                        this.printInvalidMove(resolve)
                    }
                }
            });
        });
    }

    async printHelp(resolve) {
        let description = this.moves;
        description.unshift(' v PC\\User >');
        const data = [
            description,
        ];
        this.pushOtherLines(this.numMoves, this.moves, winMatrix, data);
        console.log(table(data));
        this.getUserMoveIndex().then(resolve);
    }

    printInvalidMove(resolve) {
        console.log("Invalid move. Enter '?' for help.");
        this.getUserMoveIndex().then(resolve);
    }

    printAvailableMoves() {
        this.moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
        console.log("0 - exit");
        console.log("? - help");
    }

    pushOtherLines(numMoves, moves, winMatrix, data) {
        for (let i = 0; i < numMoves; i++) {
            let currentArr = [moves[i+1]];

            for (let j = 0; j < numMoves; j++) {
                if (winMatrix[i][j] === 0) {
                    currentArr.push("Draw")
                } else if (winMatrix[i][j] === -1) {
                    currentArr.push("Lose")
                } else if (winMatrix[i][j] === 1) {
                    currentArr.push("Win")
                }
            }
            data.push(currentArr)
        }
    }
}
