import {Key} from "./key.js";
import {Table} from "./table.js";
import {Rules} from "./rules.js"

export let moves = process.argv.slice(2);
const numMoves = moves.length;
const computerMove = generateComputerMove();
let key = new Key(computerMove);
let table = new Table(moves);
let rules = new Rules(moves);
let computerMoveIndex = moves.indexOf(computerMove);

function generateComputerMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}

function createWinMatrix(numElements) {
    const winMatrix = [];

    let firstRow = [0];

    for (let i = 1; i < Math.ceil(numMoves / 2); i++) {
        if (i % 2 === 0) {
            firstRow.push(1,-1)
        } else {
            firstRow.push(-1,1)
        }
    }
    winMatrix.push(firstRow);

    for (let i = 1; i < numMoves; i++) {
        let currentArr = firstRow.slice();
        currentArr.unshift(currentArr.pop());
        let otherArr = currentArr.slice();
        winMatrix.push(otherArr);
        firstRow = currentArr;
    }

    return winMatrix;
}

let winMatrix = createWinMatrix(numMoves);

export function checkGameResult(userMoveIndex, computerMoveIndex) {

    let result = winMatrix[userMoveIndex - 1][computerMoveIndex - 1];

    if (result === 1) {
        return "You win!";
    } else if (result === -1) {
        return "Computer wins!";
    } else {
        return "It's a tie!";
    }
}

export  async function main() {
    rules.checkCorrectInput();

    console.log("HMAC: " + key.hmac);
    console.log("Available moves:");
    table.printAvailableMoves(moves)
    const userMoveIndex = await table.getUserMoveIndex() - 1;
    console.log("Your move: " + moves[userMoveIndex]);
    console.log("Computer move: " + computerMove);
    console.log(checkGameResult(userMoveIndex, computerMoveIndex));
    console.log("HMAC key: " + key.secretKey)
}

await main();