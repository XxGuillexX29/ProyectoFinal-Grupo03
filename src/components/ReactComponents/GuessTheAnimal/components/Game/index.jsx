import React, { useState, useEffect } from "react";
import "./style.css";
import PlayerInput from "../PlayerInput/index.jsx";
import AnimalImage from "../Animal/index.jsx";
import Scoreboard from "../Scoreboard/index.jsx";
import GameOver from "../GameOver/index.jsx";
import animalsData from "../../data/animals.json";

// Determine the maximum number of rounds.
let maxRounds = Math.floor(Math.random() * (10 - 5 + 1) + 5);

function Game() {
    const [players, setPlayers] = useState([]); // State to store player names.
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Index of the current player.
    const [score, setScore] = useState({}); // State to store player scores.
    const [roundsPlayed, setRoundsPlayed] = useState(0); // Number of rounds played.
    const [currentAnimal, setCurrentAnimal] = useState(null); // The current animal to be guessed.
    const [shuffledOptions, setShuffledOptions] = useState([]); // Shuffled answer options for the current animal.

    const [showResult, setShowResult] = useState(false);
    const [resultText, setResultText] = useState("");
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    let totalRounds = maxRounds * 2; // Equal number of rounds for the two players

    // Generate new rounds until the total rounds reaches 0
    useEffect(() => {
        if (roundsPlayed < totalRounds) {
            generateNewRound();
        }
    }, [roundsPlayed]);

    // Generate a new round of the game.
    const generateNewRound = () => {
        let correctAnimal = getRandomAnimal();
        let randomOptions = [correctAnimal];

        while (randomOptions.length < 3) {
            const opcion = getRandomAnimal();
            if (!randomOptions.includes(opcion)) {
                randomOptions.push(opcion);
            }
        }

        setCurrentAnimal(correctAnimal);
        setShuffledOptions([...randomOptions].sort(() => Math.random() - 0.5));
    };

    // Choose a random animal.
    const getRandomAnimal = () => {
        let animals = animalsData;
        const randomIndex = Math.floor(Math.random() * animals.length);
        return animals[randomIndex];
    }

    // Handle the player's guess.
    const handleGuess = (guess) => {
        let currentScore = score[players[currentPlayerIndex]] || 0;
        let isCorrect = false;

        if (guess.toLowerCase() === currentAnimal.nameEn.toLowerCase()) {
            currentScore += 1;
            isCorrect = true;
        }
        setResultText(isCorrect ? "CORRECT!" : "Wrong answear");
        setShowResult(true);
        setButtonsDisabled(true);

        setScore({
            ...score,
            [players[currentPlayerIndex]]: currentScore,
        });
    }

    // Move to the next round and change the states
    const handleNextRound = () => {
        setRoundsPlayed((prevRoundsPlayed) => prevRoundsPlayed + 1);
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);

        setShowResult(false);
        setButtonsDisabled(false);
    }

    // Start the game with player names.
    const startGame = (playerNames) => {
        setPlayers(playerNames);
    }

    // Restart the game.
    const restartGame = () => {
        setCurrentPlayerIndex(0);
        setScore({});
        setRoundsPlayed(0);
        setCurrentAnimal(null);
        setShuffledOptions([]);
        setPlayers([]);
        maxRounds = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    };

    if (roundsPlayed < totalRounds) {
        return (
            <>
                {players.length < 2 ? (
                    <PlayerInput onPlayersSet={startGame} />
                ) : (
                    <>
                        <div className="turn-table">
                            <h2>Round {parseInt(roundsPlayed / 2)} of {maxRounds}</h2>
                            <h2 className="player-turn">{players[currentPlayerIndex]} turn</h2>
                        </div>

                        {currentAnimal && (
                            <section>
                                <AnimalImage animal={currentAnimal} onGuess={handleGuess} />
                                <div className="buttons">
                                    {shuffledOptions.map((option, index) => (
                                        <button className="button option-button" key={index} onClick={() => handleGuess(option.nameEn)} disabled={buttonsDisabled}>
                                            {option.nameEn}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}

                        {showResult && (
                            <div className="next-round">
                                <p className={resultText === "CORRECT!" ? "correct-answer" : "incorrect-answer"}>{resultText}</p>
                                <button className="button next-animal" onClick={handleNextRound}>Next animal</button>
                            </div>
                        )}

                        <Scoreboard score={score} players={players} />
                    </>
                )}
            </>
        );
    } else {
        return <GameOver score={score} players={players} onRestart={restartGame} />;
    };
};

export default Game;