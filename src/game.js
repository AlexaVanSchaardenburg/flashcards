const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const { createCard } = require('../src/card');
const { createDeck, countCards } = require('../src/deck');
const { } = require('../src/turns');
const { createRound } = require('../src/round');

function start(){
  let cards = []
  for (let i=0; i<prototypeQuestions.length; i++){
    let card = createCard(prototypeQuestions[i].id, prototypeQuestions[i].question, prototypeQuestions[i].answers, prototypeQuestions[i].correctAnswer)
    cards.push(card)
  }

  const deck = createDeck(cards)
  const round = createRound(deck)
  printMessage(deck)
  printQuestion(round)
  return round
};

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

start()

module.exports = { printMessage, printQuestion, start };
