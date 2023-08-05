import readline from "readline";
import { table } from 'table';
import {checkGameResult, moves} from "./app.js";

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
        let description = moves;
        description.unshift(' v PC\\User >');
        const data = [
            description,
        ];
        pushOtherLines();
        console.log(table(data));
        this.getUserMoveIndex().then(resolve);

        function pushOtherLines() {
            for (let i = 1; i < moves.length; i++) {
                let currentArr = [moves[i]];

                for (let j = 1; j < moves.length; j++) {
                    if (checkGameResult(i, j) === "It's a tie!") {
                        currentArr.push("Draw")
                    } else if (checkGameResult(i, j) === "Computer wins!") {
                        currentArr.push("Lose")
                    } else if (checkGameResult(i, j) === "You win!") {
                        currentArr.push("Win")
                    }
                }
                data.push(currentArr)
            }
        }
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
