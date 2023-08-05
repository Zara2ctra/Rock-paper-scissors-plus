import { Key } from "./key.js";
import { Table } from "./table.js";
import { Rules } from "./rules.js"

export let moves = process.argv.slice(2);
const computerMove = generateComputerMove();
let key = new Key(computerMove);
let table = new Table(moves);
let rules = new Rules(moves);
let computerMoveIndex = moves.indexOf(computerMove);

function generateComputerMove() {
    return moves[Math.floor(Math.random() * moves.length)];
}

export function checkGameResult(userMoveIndex, computerMoveIndex) {
    const diff = (userMoveIndex - computerMoveIndex);
    let gameResult;

    if (diff === 0) {
        gameResult = "It's a tie!";
    } else if (diff < 0 && diff >= -3) {
        gameResult = "You win!";
    } else if (diff < 0){
        gameResult = "Computer wins!";
    } else if (diff > 3) {
        gameResult = "You win!";
    } else {
        gameResult = "Computer wins!";
    }

    return gameResult;
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