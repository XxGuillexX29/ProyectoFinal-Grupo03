import React, { useState, useEffect } from "react";
import "./style.css";

function PlayerInput({ onPlayersSet }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [startButtonDisabled, setStartButtonDisabled] = useState(true);

  const handlePlayerNameChange = (e, playerNumber) => {
    const playerName = e.target.value;
    if (playerNumber === 1) {
      setPlayer1(playerName);
    } else {
      setPlayer2(playerName);
    }
  };

  useEffect(() => {
    if (player1.length > 0 && player2.length > 0) {
      setStartButtonDisabled(false);
    } else {
      setStartButtonDisabled(true);
    }
  }, [player1, player2]);

  const handleStartGame = () => {
    const playerNames = [player1, player2];
    onPlayersSet(playerNames);
  };

  return (
    <section className="players-container">
      <h2 className="gta-subtitle">Players name:</h2>
      <input className="player-input" type="text" placeholder="Enter Player 1's Name" value={player1} onChange={(e) => handlePlayerNameChange(e, 1)} />
      <input className="player-input" type="text" placeholder="Enter Player 2's Name" value={player2} onChange={(e) => handlePlayerNameChange(e, 2)} />

      <button className="gta-button start-button" onClick={handleStartGame} disabled={startButtonDisabled} >Start</button>
    </section>
  );
};

export default PlayerInput;