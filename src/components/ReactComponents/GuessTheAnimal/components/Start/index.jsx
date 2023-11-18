import React, { useState } from 'react';
import Game from '../Game';
import './style.css';

function Start() {
    const [mostrarJuego, setMostrarJuego] = useState(false);

    const playGame = () => {
        setMostrarJuego(true);
    };

    if (!mostrarJuego) {
        return (
            <div className='start-container'>
                <button className='play-button gta-button' onClick={playGame}>Play</button>
            </div>
        );
    } else {
        return <Game />
    }
}

export default Start;