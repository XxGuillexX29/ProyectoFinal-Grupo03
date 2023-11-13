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
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [currentAnimal, setCurrentAnimal] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [resultText, setResultText] = useState("");
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [showWildcard, setShowWildcard] = useState(true);
    // Game state object to store scores, wildcard usage, and eliminated option.
    const [gameState, setGameState] = useState({
        score: {},
        wildcardUsed: {},
        eliminatedOption: null,
    });

    // Equal number of rounds for the two players.
    let totalRounds = maxRounds * 2;

    // Generate new rounds until the total rounds reach 0.
    useEffect(() => {
        if (roundsPlayed < totalRounds) {
            generateNewRound();
        }
    }, [roundsPlayed]);

    // Generate a new round of the game.
    const generateNewRound = () => {
        const correctAnimal = getRandomAnimal();
        const options = createOptions(correctAnimal);
        setCurrentAnimal(correctAnimal);
        setShuffledOptions([...options].sort(() => Math.random() - 0.5));
        setGameState((prevGameState) => ({
            ...prevGameState,
            eliminatedOption: null,
        }));
        setShowWildcard(true);
    };

    // Create options for the current round, including the correct animal.
    const createOptions = (correctAnimal) => {
        const options = [correctAnimal];
        while (options.length < 3) {
            const option = getRandomAnimal();
            if (!options.includes(option)) {
                options.push(option);
            }
        }
        return options;
    };

    // Start the game with player names.
    const startGame = (playerNames) => {
        setPlayers(playerNames);
    };

    // Choose a random animal from the data.
    const getRandomAnimal = () => {
        const animals = animalsData;
        const randomIndex = Math.floor(Math.random() * animals.length);
        return animals[randomIndex];
    };

    // Handle the player's guess.
    const handleGuess = (guess) => {
        const currentScore = gameState.score[players[currentPlayerIndex]] || 0;
        const isCorrect = guess.toLowerCase() === currentAnimal.nameEn.toLowerCase();

        setResultText(isCorrect ? "CORRECT!" : "Wrong answer");
        setShowResult(true);
        setButtonsDisabled(true);

        setGameState((prevGameState) => ({
            ...prevGameState,
            score: {
                ...prevGameState.score,
                [players[currentPlayerIndex]]: currentScore + (isCorrect ? 1 : 0),
            },
        }));
    };

    // Move to the next round and change the states.
    const handleNextRound = () => {
        setRoundsPlayed((prevRoundsPlayed) => prevRoundsPlayed + 1);
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        setShowResult(false);
        setButtonsDisabled(false);
    };

    // Handle the wildcard button click.
    const handleWildcard = () => {
        const currentPlayer = players[currentPlayerIndex];
        if (!gameState.wildcardUsed[currentPlayer]) {
            const incorrectOptions = shuffledOptions.filter(o => o.nameEn !== currentAnimal.nameEn);
            if (incorrectOptions.length >= 2) {
                const optionToRemove = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
                setGameState((prevGameState) => ({
                    ...prevGameState,
                    eliminatedOption: optionToRemove,
                    wildcardUsed: {
                        ...prevGameState.wildcardUsed,
                        [currentPlayer]: true,
                    },
                }));
                setShuffledOptions((prevOptions) => prevOptions.filter(option => option !== optionToRemove));
                setShowWildcard(false);
            }
        }
    };

    const restartGame = () => {
        setCurrentPlayerIndex(0);
        setGameState({
            score: {},
            wildcardUsed: {},
            eliminatedOption: null,
        });
        setRoundsPlayed(0);
        setCurrentAnimal(null);
        setShuffledOptions([]);
        setPlayers([]);
        maxRounds = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    };

    // Conditional rendering based on the number of rounds played.
    if (roundsPlayed < totalRounds) {
        return (
            <>
                {players.length < 2 ? (
                    <PlayerInput onPlayersSet={startGame} />
                ) : (
                    <>
                        <div className="turn-table">
                            <h2>Round {Math.floor(roundsPlayed / 2) + 1} of {maxRounds}</h2>
                            <h2 className="player-turn">{players[currentPlayerIndex]} turn</h2>
                            {showWildcard && (
                                <button
                                    className={`button wildcard-button ${gameState.wildcardUsed[players[currentPlayerIndex]] ? 'incorrect-answer' : ''}`}
                                    onClick={handleWildcard}
                                    disabled={buttonsDisabled || gameState.wildcardUsed[players[currentPlayerIndex]]} >
                                    Help?
                                </button>
                            )}
                        </div>

                        {currentAnimal && (
                            <section>
                                <AnimalImage animal={currentAnimal} onGuess={handleGuess} />
                                <div className="buttons">
                                    {shuffledOptions.map((option, index) => (
                                        <button
                                            className={`button option-button ${option === gameState.eliminatedOption ? 'eliminated' : ''}`}
                                            key={index} onClick={() => handleGuess(option.nameEn)}
                                            disabled={buttonsDisabled || option === gameState.eliminatedOption} >
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

                        <Scoreboard score={gameState.score} players={players} />
                    </>
                )}
            </>
        );
    } else {
        return <GameOver score={gameState.score} players={players} onRestart={restartGame} />;
    }
}

export default Game;