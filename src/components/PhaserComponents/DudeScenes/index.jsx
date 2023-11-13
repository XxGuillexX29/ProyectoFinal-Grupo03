import React, { useEffect } from 'react';
import * as Phaser from 'phaser';
import Escena1 from './scenes/Escena1';
import Escena2 from './scenes/Escena2';
import Escena3 from './scenes/Escena3';
import Pierde from './scenes/Pierde';
import Gana from './scenes/Gana';
import Menu from './scenes/Menu';

const createScene = (Scene) => new Scene();
const Escenas = [Menu, Escena1, Escena2, Escena3, Pierde, Gana];
const iniciarEscena = () => Escenas.map(createScene);

const Dude = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 1200,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            input: {
                keyboard: true
            },
            scene: iniciarEscena()
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div id="phaser-game" />
    );
};

export default Dude;