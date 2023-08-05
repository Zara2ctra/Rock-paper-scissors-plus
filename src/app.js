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
    const winMatrix = Array.from({ length: numElements }, () => Array(numElements).fill(0));

    for (let i = 0; i < numElements; i++) {
        for (let j = 0; j < numElements; j++) {
            const diff = (i - j + numElements) % numElements;
            if (diff === 0) {
                winMatrix[i][j] = 0; // Ничья
            } else if (diff <= (numElements - 1) / 2) {
                winMatrix[i][j] = 1; // i побеждает j
            } else {
                winMatrix[i][j] = -1; // i проигрывает j
            }
        }
    }

    return winMatrix;
}

export function checkGameResult(userMoveIndex, computerMoveIndex) {
    let winMatrix = createWinMatrix(numMoves);
    const result = winMatrix[userMoveIndex - 1][computerMoveIndex - 1];

    if (result === 1) {
        return "You win!";
    } else if (result === -1) {
        return "Computer wins!";
    } else {
        return "It's a tie!";
    }
}

export async function main() {
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