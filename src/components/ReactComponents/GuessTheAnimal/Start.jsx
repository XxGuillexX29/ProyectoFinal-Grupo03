import React, { useState } from 'react';
import Game from './components/Game';
import './App.css';

function Start() {
    const [mostrarJuego, setMostrarJuego] = useState(false);

    const playGame = () => {
        setMostrarJuego(true);
    };

    if (!mostrarJuego) {
        return (
            <div className='start-container'>
                <button className='play-button button' onClick={playGame}>Play</button>
            </div>
        );
    } else {
        return <Game />
    }
}

export default Start;