// Generate and shuffle deck
const createDeck = () => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      let value = parseInt(rank);
      if (['J', 'Q', 'K'].includes(rank)) {
        value = 10;
      } else if (rank === 'A') {
        value = 11;
      }
      deck.push({ suit, rank, value });
    }
  }

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};

// Calculate hand score
const calculateScore = (hand) => {
  let score = 0;
  let aces = 0;

  for (let card of hand) {
    score += card.value;
    if (card.rank === 'A') {
      aces += 1;
    }
  }

  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
};

// Determine winner
const determineWinner = (playerScore, dealerScore) => {
  if (playerScore > 21) return 'Dealer';
  if (dealerScore > 21) return 'Player';
  
  if (playerScore > dealerScore) {
    return 'Player';
  } else if (dealerScore > playerScore) {
    return 'Dealer';
  } else {
    return 'Draw';
  }
};

module.exports = {
  createDeck,
  calculateScore,
  determineWinner
};
