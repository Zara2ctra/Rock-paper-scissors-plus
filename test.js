import { expect } from 'chai';
import {checkGameResult} from './src/app.js';
import { Rules } from './src/rules.js';


describe("Testing game result", function() {
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

describe("Testing rules", function() {
    it("Test game rules when we have even arguments", function() {
        let rules = new Rules([1, 2, 4, 4]);
        expect(() => rules.checkCorrectInput()).to.throw("The number of arguments must be odd");
    });

    it("Test game result when we have duplicates in input", function() {
        let rules = new Rules([1, 2, 4, 4, 5]);
        expect(() => rules.checkCorrectInput()).to.throw("All arguments must be unique");
    });

    it("Test game result when we have 2 arguments", function() {
        let rules = new Rules(["rock"]);
        expect(() => rules.checkCorrectInput()).to.throw("The number of moves must be greater than two");
    });

    it("Test game result when we have 2 arguments", function() {
        let rules = new Rules(["rock", "paper", 3]);
        expect(() => rules.checkCorrectInput()).to.not.throw();
    });
})

