// const chai = require('chai');
// const expect = chai.expect;
// const { start } = require('../src/game');
// const { sampleData } = require('../src/sample-data');
// const { createCard } = require('../src/card');

// describe('start the game', function(){
//     it('should create a new round using cards input', function(){
//         //given cards the function should output a round with the cards stored in the deck, the currentCard as the first card, 0 turns and an empty array of incorrectGuesses
//         let cards = []
//         for (let i=0; i<3; i++){
//           const card = createCard(sampleData[i].id, sampleData[i].question, sampleData[i].answers, sampleData[i].correctAnswer)
//           cards.push(card)
//         }

//         const round = start()

//         expect(round.deck).to.deep.equal(cards)
//         expect(round.currentCard).to.equal(cards[0])
//         expect(round.turns).to.equal(0)
//         expect(round.incorrectGuesses).to.deep.equal([])
//     });
// });
