import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/game';

const suitSymbols = {
  Hearts: '♥',
  Diamonds: '♦',
  Clubs: '♣',
  Spades: '♠'
};

const suitColors = {
  Hearts: '#d93838', // Red
  Diamonds: '#d93838', // Red
  Clubs: '#1a1a1a', // Dark Gray/Black
  Spades: '#1a1a1a' // Dark Gray/Black
};

const Card = ({ suit, rank }) => {
  return (
    <div className="playing-card" style={{ color: suitColors[suit] }}>
      <div className="card-top-left">
        <div className="card-rank">{rank}</div>
        <div className="card-suit">{suitSymbols[suit]}</div>
      </div>
      <div className="card-center-suit">{suitSymbols[suit]}</div>
      <div className="card-bottom-right">
        <div className="card-rank">{rank}</div>
        <div className="card-suit">{suitSymbols[suit]}</div>
      </div>
    </div>
  );
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // splash, info, game
  const [playerName, setPlayerName] = useState('');

  const [gameState, setGameState] = useState(null);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Splash Screen Transition
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('info');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const startGame = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/start`);
      setGameState(response.data);
      setWinnerMessage('');
    } catch (err) {
      console.error('Error starting game:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayClick = () => {
    setCurrentScreen('game');
    startGame();
  };

  useEffect(() => {
    if (gameState && gameState.winner) {
      if (gameState.winner === 'Player') {
        setWinnerMessage('You Win! 🎉');
      } else if (gameState.winner === 'Dealer') {
        setWinnerMessage('Dealer Wins! 😔');
      } else {
        setWinnerMessage("It's a Draw! 🤝");
      }

      const timer = setTimeout(() => {
        startGame();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [gameState?.winner]);

  const handleHit = async () => {
    if (!gameState || gameState.winner || loading) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/hit`, { gameId: gameState._id });
      setGameState(response.data);
    } catch (err) {
      console.error('Error hitting:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStand = async () => {
    if (!gameState || gameState.winner || loading) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/stand`, { gameId: gameState._id });
      setGameState(response.data);
    } catch (err) {
      console.error('Error standing:', err);
    } finally {
      setLoading(false);
    }
  };

  if (currentScreen === 'splash') {
    return (
      <div className="splash-screen">
        <div className="splash-title">Blackjack</div>
      </div>
    );
  }

  if (currentScreen === 'info') {
    return (
      <div className="info-screen">
        <input 
          type="text" 
          className="name-input" 
          placeholder="Enter your name..." 
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <div className="rules-box">
          <h3>Game Rules</h3>
          <ul className="rules-list">
            <li>The goal is to get a hand total closer to 21 than the dealer without going over.</li>
            <li>Face cards are worth 10. Aces are worth 1 or 11.</li>
            <li>Click 'Hit' to take another card, or 'Stand' to end your turn.</li>
            <li>If you go over 21, you bust and the dealer wins.</li>
            <li>The dealer must draw cards until their total is 17 or higher.</li>
          </ul>
        </div>
        <button className="play-btn" onClick={handlePlayClick}>Play</button>
      </div>
    );
  }

  if (!gameState) {
    return <div>Loading Game...</div>;
  }

  return (
    <div className="app-container">
      <h1>Blackjack Game</h1>
      
      <div className="game-board">
        <div className="hand-container">
          <h2>{playerName ? `${playerName}'s Hand` : 'Player Hand'}</h2>
          <div className="score">Score: {gameState.player.score}</div>
          <div className="cards-wrapper">
            {gameState.player.hand.map((card, idx) => (
              <Card key={idx} suit={card.suit} rank={card.rank} />
            ))}
          </div>
        </div>

        <div className="hand-container">
          <h2>Dealer Hand</h2>
          <div className="score">Score: {gameState.dealer.score}</div>
          <div className="cards-wrapper">
            {gameState.dealer.hand.map((card, idx) => (
              <Card key={idx} suit={card.suit} rank={card.rank} />
            ))}
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={handleHit} disabled={loading || !!gameState.winner}>
          Hit
        </button>
        <button onClick={handleStand} disabled={loading || !!gameState.winner}>
          Stand
        </button>
        <button onClick={startGame} disabled={loading}>
          Start New Game
        </button>
      </div>

      {winnerMessage && (
        <div className="winner-message">
          {winnerMessage}
        </div>
      )}
    </div>
  );
}

export default App;
