import React, { useEffect } from 'react';
import * as Phaser from 'phaser';
import Menu from './scenes/Menu';
import EscenaPrincipal from './scenes/EscenaPrincipal';
import EscenaMedia from './scenes/EscenaMedia';
import EscenaFinal from './scenes/EscenaFinal';
import Pierde from './scenes/Pierde';
import Gana from './scenes/Gana';

const createScene = (Scene) => new Scene();
const scenes = [Menu, EscenaPrincipal, EscenaMedia, EscenaFinal, Pierde, Gana];
const createScenes = () => scenes.map(createScene);

const SpaceShooter = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1100,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: createScenes()
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-container" className='phaser-container' />;
};

export default SpaceShooter;