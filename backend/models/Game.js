const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  suit: String,
  rank: String,
  value: Number
});

const playerSchema = new mongoose.Schema({
  name: String,
  hand: [cardSchema],
  score: {
    type: Number,
    default: 0
  }
});

const gameSchema = new mongoose.Schema({
  deck: [cardSchema],
  player: playerSchema,
  dealer: playerSchema,
  winner: {
    type: String,
    enum: ['Player', 'Dealer', 'Draw', null],
    default: null
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
