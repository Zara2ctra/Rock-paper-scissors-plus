import { expect } from 'chai';
import {checkGameResult} from './src/app.js';

describe("Tests", function() {
    it("Test game result when user move index 3 and computer move index 3", function() {
        const expectedResult = "It's a tie!";

        expect(checkGameResult(3, 3)).to.equal(expectedResult);
    });

    it("Test game result when user move index 5 and computer move index 5", function() {
        const expectedResult = "It's a tie!";

        expect(checkGameResult(5, 5)).to.equal(expectedResult);
    });

    it("Test game result when user move index 3 and computer move index 5", function() {
        const expectedResult = "You win!";

        expect(checkGameResult(3, 5)).to.equal(expectedResult);
    });

    it("Test game result when user move index 5 and computer move index 3", function() {
        const expectedResult = "Computer wins!";

        expect(checkGameResult(5, 3)).to.equal(expectedResult);
    });

    it("Test game result when user move index 1 and computer move index 17", function() {
        const expectedResult = "Computer wins!";

        expect(checkGameResult(1, 17)).to.equal(expectedResult);
    });

    it("Test game result when user move index 17 and computer move index 1", function() {
        const expectedResult = "You win!";

        expect(checkGameResult(17, 1)).to.equal(expectedResult);
    });
})

