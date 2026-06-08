const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/Game');
const { createDeck, calculateScore, determineWinner } = require('./utils/gameLogic');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blackjack')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start a new game
app.post('/game/start', async (req, res) => {
  try {
    const deck = createDeck();
    
    // Deal initial cards
    const playerHand = [deck.pop(), deck.pop()];
    const dealerHand = [deck.pop(), deck.pop()];
    
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    
    // Check for immediate blackjack
    let winner = null;
    if (playerScore === 21 && dealerScore === 21) {
      winner = 'Draw';
    } else if (playerScore === 21) {
      winner = 'Player';
    } else if (dealerScore === 21) {
      winner = 'Dealer';
    }
    
    const newGame = new Game({
      deck,
      player: { name: 'Player', hand: playerHand, score: playerScore },
      dealer: { name: 'Dealer', hand: dealerHand, score: dealerScore },
      winner
    });
    
    await newGame.save();
    res.json(newGame);
  } catch (err) {
    res.status(500).json({ error: 'Failed to start game' });
  }
});

// Hit
app.post('/game/hit', async (req, res) => {
  try {
    const { gameId } = req.body;
    const game = await Game.findById(gameId);
    
    if (!game || game.winner) {
      return res.status(400).json({ error: 'Game over or not found' });
    }
    
    // Pop a card for player
    const card = game.deck.pop();
    game.player.hand.push(card);
    game.player.score = calculateScore(game.player.hand);
    
    // Check if player busted
    if (game.player.score > 21) {
      game.winner = 'Dealer';
    }
    
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to hit' });
  }
});

// Stand
app.post('/game/stand', async (req, res) => {
  try {
    const { gameId } = req.body;
    const game = await Game.findById(gameId);
    
    if (!game || game.winner) {
      return res.status(400).json({ error: 'Game over or not found' });
    }
    
    // Dealer logic: draw until >= 17
    while (game.dealer.score < 17) {
      game.dealer.hand.push(game.deck.pop());
      game.dealer.score = calculateScore(game.dealer.hand);
    }
    
    game.winner = determineWinner(game.player.score, game.dealer.score);
    
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to stand' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
