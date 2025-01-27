const chai = require('chai');
const expect = chai.expect;
const { createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/round');
const { sampleData } = require('../src/sample-data');
const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');

let cards = []

beforeEach(function(){
  cards = sampleData.map(card => createCard(card.id, card.question, card.answers, card.correctAnswer))
});


describe('checks that the deck, currentCard, incorrectGuesses, and Turn variables are all available inside the round', function(){
    it('should have a deck that holds cards', function(){
        const deck = createDeck(cards)
        const round = createRound(deck)

        expect(round.deck).to.deep.equal([sampleData[0], sampleData[1], sampleData[2], sampleData[3], sampleData[4], sampleData[5]])


    });
    it('should have a current card that is the first card in the deck', function(){
        const deck = createDeck(cards)
        const round = createRound(deck)

        expect(round.currentCard).to.deep.equal(sampleData[0])

    });
    it('should have a turns tracker starting at 0', function(){
        const deck = createDeck(cards)
        const round = createRound(deck)

        expect(round.turns).to.equal(0)
    });
    it('should have an empty array to store cards guess wrong', function(){
        const deck = createDeck(cards)
        const round = createRound(deck)

        expect(round.incorrectGuesses).to.deep.equal([])
    });
});
describe('Checks takeTurn functionality', function(){
    it('should update the turn count each time a guess is made', function(){
        const deck = createDeck(cards)
        const round = createRound(deck)

        takeTurn('array', round)
        expect(round.turns).to.equal(1)

        takeTurn('object', round)
        takeTurn('method', round)
        expect(round.turns).to.equal(3)
    });
    it('should change the currentCard to the next card in the deck', function(){
        const deck = createDeck(cards)
        const round = createRound(deck)

        takeTurn('iterator', round)
        expect(round.currentCard).to.deep.equal(sampleData[1])

        takeTurn('method', round)
        takeTurn('object', round)
        expect(round.currentCard).to.deep.equal(sampleData[3])
    });
    it('guess should be evaluated, if the guess is incorrect the card is stored in the incrrectGuesses array', function(){
      const deck = createDeck(cards)
      const round = createRound(deck)

      takeTurn('method', round)
      expect(round.incorrectGuesses).to.deep.equal([1])

      takeTurn('array', round)
      takeTurn('method', round)
      expect(round.incorrectGuesses).to.deep.equal([1, 3])

    });
    it('user should recieve feedback on result of guess', function(){
      const deck = createDeck(cards)
      const round = createRound(deck)

      let result = takeTurn('method', round)
      expect(result).to.equal('incorrect!')

      result = takeTurn('array', round)
      expect(result).to.equal('correct!')
    });
});
describe('checks calculatePercent functionality', function(){
    it('should calculate the percent of correct guesses made in a round', function(){
      const deck = createDeck(cards)
      const round = createRound(deck)

      takeTurn('wrong', round)
      takeTurn('array', round)
      takeTurn('wrong', round)
      takeTurn('wrong', round)
      takeTurn('iteration method', round)
      takeTurn('sort()', round)

      const percentCorrect = calculatePercentCorrect(round)

      expect(percentCorrect).to.equal('50%')
    });
    it('should calculate the percent of correct guesses made in a round with a different number of incorrect guesses', function(){
      const deck = createDeck(cards)
      const round = createRound(deck)
      takeTurn('wrong', round)
      takeTurn('array', round)
      takeTurn('wrong', round)
      takeTurn('wrong', round)
      takeTurn('iteration method', round)
      takeTurn('wrong', round)

      const percentCorrect = calculatePercentCorrect(round)

      expect(percentCorrect).to.equal('33%')
    });
});
describe('checks endRound Functionality', function(){
    it('should return an end of round message and the precent of correct guesses', function(){
      const deck = createDeck(cards)
      const round = createRound(deck)
      takeTurn('object', round)
      takeTurn('array', round)
      takeTurn('wrong', round)
      takeTurn('wrong', round)
      takeTurn('iteration method', round)
      takeTurn('sort()', round)

      const message = endRound(round)

      expect(message).to.equal(`**ROUND OVER** You answered 67% of the questions correctly!`)

    });
});