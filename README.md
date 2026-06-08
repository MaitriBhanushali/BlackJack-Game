# BlackJack-Game
<br>
# MERN Stack Blackjack ♠️♥️♣️♦️

A full-stack web application implementing the classic casino game of Blackjack. This project was built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to demonstrate RESTful API design, state management, and full-stack game logic implementation.

## 📝 Description

This application allows users to play Blackjack against an automated dealer. The backend handles the deck generation, shuffling algorithms, score calculation, and win-state evaluations to prevent client-side manipulation. Game states and history are persisted in a MongoDB database, while the frontend provides a responsive and interactive user interface.

## 🚀 Features

*   **Full Game Cycle:** Start a new game, Hit, Stand, and automatic dealer turns.
*   **Server-Side Logic:** Deck shuffling (Fisher-Yates) and score evaluation are securely handled by the Node.js backend.
*   **Dynamic Scoring:** Automatically adjusts the value of an "Ace" (11 or 1) to prevent the player from busting unnecessarily.
*   **Database Persistence:** Game history, player scores, and dealer hands are saved to MongoDB.
*   **Auto-Restart:** Automatically triggers a new game a few seconds after a winner is declared.

## 🛠️ Tech Stack

*   **Frontend:** React.js, Axios, CSS3 (Flexbox for layout)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Architecture:** RESTful API

## 📖 How to Play (Blackjack Rules)

The objective of Blackjack is to beat the dealer's hand without going over 21.

1.  **Card Values:** 
    *   Number cards (2-10) are worth their face value.
    *   Face cards (Jack, Queen, King) are worth 10.
    *   Aces are worth 11 or 1, whichever makes a better hand.
2.  **The Deal:** Both the player and the dealer are dealt two cards to start.
3.  **Player's Turn:** 
    *   **Hit:** Take another card to get closer to 21.
    *   **Stand:** End your turn and keep your current total.
    *   If you go over 21, you **Bust** and lose the game immediately.
4.  **Dealer's Turn:** The dealer must hit until their cards total 17 or higher.
5.  **Winning:** You win if your total is higher than the dealer's without exceeding 21, or if the dealer busts.

## 💻 Local Installation

To run this project locally, follow these steps:

### Prerequisites
*   Node.js installed
*   MongoDB installed and running locally (or a MongoDB Atlas URI)

### Backend Setup
1. Navigate to the backend directory:
```bash
   cd backend
