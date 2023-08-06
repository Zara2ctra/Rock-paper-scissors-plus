import {Key} from "./key.js";
import {Table} from "./table.js";
import {Rules} from "./rules.js"

export let moves = process.argv.slice(2);
const numMoves = moves.length;
let rules = new Rules(moves);
rules.checkCorrectInput();
export let winMatrix = rules.createWinMatrix(numMoves);
const computerMove = rules.generateComputerMove();
let table = new Table(moves);
let key = new Key(computerMove);
let computerMoveIndex = moves.indexOf(computerMove);
rules.checkCorrectInput();

export  async function main() {
    console.log("HMAC: " + key.hmac);
    console.log("Available moves:");
    table.printAvailableMoves(moves)
    const userMoveIndex = await table.getUserMoveIndex() - 1;
    console.log("Your move: " + moves[userMoveIndex]);
    console.log("Computer move: " + computerMove);
    console.log(rules.checkGameResult(userMoveIndex, computerMoveIndex));
    console.log("HMAC key: " + key.secretKey)
}

await main();