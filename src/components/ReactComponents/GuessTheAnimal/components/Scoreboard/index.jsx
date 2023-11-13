import React from "react";
import "./style.css";

function Scoreboard({ score, players }) {
    return (
        <section className="score-container">
            <h2 className="score-title">Score:</h2>
            <ul className="score-list">
                {players.map((player) => (
                    <li className="score-player" key={player}>
                        {player}: {score[player] || 0}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Scoreboard;