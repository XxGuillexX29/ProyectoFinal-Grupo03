import React from "react";
import "./style.css";
import Scoreboard from "../Scoreboard";

function GameOver({ score, players, onRestart }) {

    function findPlayersWithHighestScore(score) {
        let highestPlayers = [];
        let highestScore = -1;

        for (const player in score) {
            if (score[player] > highestScore) {
                highestPlayers = [player];
                highestScore = score[player];
            } else if (score[player] === highestScore) {
                highestPlayers.push(player);
            }
        }
        return highestPlayers;
    };

    const highestScoringPlayers = findPlayersWithHighestScore(score);

    return (
        <section className="game-over-container">
            <h2 className="subtitle">Game Over</h2>
            <Scoreboard score={score} players={players} />

            <div>
                {highestScoringPlayers.length === 1 ? (
                    <p className="higher-score">Player with highest score: <span>{highestScoringPlayers}</span></p>
                ) : (
                    <p className="tie-message">Players have tied Game!</p>
                )}
            </div>

            <button className="button" onClick={onRestart}>Restart</button>
        </section>
    );
};

export default GameOver;