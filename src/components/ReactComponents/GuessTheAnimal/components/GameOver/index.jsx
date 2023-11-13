import React from "react";
import "./style.css";
import Scoreboard from "../Scoreboard";

function GameOver({ score, players, onRestart }) {

    function findPlayerWithHighestScore(score) {
        let highestPlayer = null;
        let highestScore = -1;

        for (const player in score) {
            if (score[player] > highestScore) {
                highestPlayer = player;
                highestScore = score[player];
            }
        }

        return highestPlayer;
    }

    const highestScoringPlayer = findPlayerWithHighestScore(score);

    return (
        <section className="game-over-container">
            <h2 className="subtitle">Game Over</h2>
            <Scoreboard score={score} players={players} />

            {highestScoringPlayer && (
                <div>
                    <p className="higher-score">Player with highest score: <span>{highestScoringPlayer}</span></p>
                </div>
            )}

            <button className="button" onClick={onRestart}>Restart</button>
        </section>
    );
};

export default GameOver;