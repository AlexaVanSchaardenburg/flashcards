const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const { createCard } = require('../src/card');
const { createDeck, countCards } = require('../src/deck');
const { } = require('../src/turns');
const { createRound } = require('../src/round');

function start(){
  const cards = prototypeQuestions.map(question => createCard(question.id, question.question, question.answers, question.correctAnswer))
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
