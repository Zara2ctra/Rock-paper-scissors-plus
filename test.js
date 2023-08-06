import { expect } from 'chai';
import { Rules } from './src/rules.js';


describe("Testing game result", function() {
    it("Test game result when user move index 3 and computer move index 3", function() {
        const expectedResult = "It's a tie!";
        const moves = [1,2,3,4,5]
        const rules = new Rules(moves);

        expect(rules.checkGameResult(3, 3)).to.equal(expectedResult);
    });

    it("Test game result when user move index 4 and computer move index 4", function() {
        const expectedResult = "It's a tie!";
        const moves = [1,2,3,4,5]
        const rules = new Rules(moves);

        expect(rules.checkGameResult(4, 4)).to.equal(expectedResult);
    });

    it("Test game result when user move index 3 and computer move index 4", function() {
        const expectedResult = "You win!";
        const moves = [1,2,3,4,5]
        const rules = new Rules(moves);

        expect(rules.checkGameResult(3, 4)).to.equal(expectedResult);
    });

    it("Test game result when user move index 4 and computer move index 3", function() {
        const expectedResult = "Computer wins!";
        const moves = [1,2,3,4,5]
        const rules = new Rules(moves);

        expect(rules.checkGameResult(4, 3)).to.equal(expectedResult);
    });

    it("Test game result when user move index 1 and computer move index 0", function() {
        const expectedResult = "Computer wins!";
        const moves = [1,2,3,4,5]
        const rules = new Rules(moves);

        expect(rules.checkGameResult(1, 0)).to.equal(expectedResult);
    });

    it("Test game result when user move index 0 and computer move index 1", function() {
        const expectedResult = "You win!";
        const moves = [1,2,3,4,5]
        const rules = new Rules(moves);

        expect(rules.checkGameResult(0, 1)).to.equal(expectedResult);
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
        expect(() => rules.checkCorrectInput()).to.throw("The number of moves must be greater");
    });

    it("Test game result when we have 2 arguments", function() {
        let rules = new Rules(["rock", "paper", 3]);
        expect(() => rules.checkCorrectInput()).to.not.throw();
    });
})

