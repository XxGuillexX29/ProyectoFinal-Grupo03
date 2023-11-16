import Enemigo from "./Enemigo.js";
import Nave from "./Nave.js";
import Boss from "./Boss.js";

class EscenaBase extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.balasJefe;
        this.score = 0;
        this.lifes = 3;
        this.bossLife = 12;
        this.soundPlayed = false;
        this.hurtSoundPlayed = false;
        this.bossSoundPlayed = false;
        this.canLoseLife = true;
        this.collidingEnemy = null;
    };

    preload() {
        //Imagenes
        this.load.image('fondo', '../assetsSpaceShooter/img/SpaceBackground.png');
        this.load.image('fondo2', '../assetsSpaceShooter/img/PlanetBG.png');
        this.load.image('loseBG', '../assetsSpaceShooter/img/LoseBG.png');
        this.load.image('winBG', '../assetsSpaceShooter/img/WinBG.png');
        this.load.image('bossBG', '../assetsSpaceShooter/img/BossBG.png');
        this.load.image('red', '../assetsSpaceShooter/img/red.png');
        this.load.image('orange', '../assetsSpaceShooter/img/orange.png');
        this.load.image('enemigo', '../assetsSpaceShooter/img/Enemy.png', { frameWidth: 70, frameHeight: 70 });
        this.load.image('boss', '../assetsSpaceShooter/img/Boss.png', { frameWidth: 160, frameHeight: 220 });
        this.load.spritesheet('nave', '../assetsSpaceShooter/img/Player.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('powerUp', '../assetsSpaceShooter/img/powerUp.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('bala', '../assetsSpaceShooter/img/shoot.png', { frameWidth: 38, frameHeight: 12 });
        this.load.spritesheet('enemigoExplosion', '../assetsSpaceShooter/img/explotion.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('hit', '../assetsSpaceShooter/img/hit.png', { frameWidth: 64, frameHeight: 64 });

        //Sonidos
        this.load.audio('loseSound', '../assetsSpaceShooter/sounds/LoseSound.wav');
        this.load.audio('selectSound', '../assetsSpaceShooter/sounds/SelectSound.wav');
        this.load.audio('hurtSound', '../assetsSpaceShooter/sounds/HurtSound.wav');
        this.load.audio('spawnSound', '../assetsSpaceShooter/sounds/SpawnSound.wav');
        this.load.audio('atackSound', '../assetsSpaceShooter/sounds/AtackSound.wav');
        this.load.audio('atackSuccessSound', '../assetsSpaceShooter/sounds/AtackSuccessSound.wav');
    };

    createPlayer() {
        if (this.nave) {
            this.nave.destroy();
        }

        this.nave = new Nave(this, this.balas, this.balas1);

        const particles = this.add.particles(-10, 0, 'red', {
            speed: 100,
            angle: { min: 150, max: 200 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        particles.startFollow(this.nave);
    }

    createBoss() {
        if (this.boss) {
            this.boss.destroy();
        };

        this.boss = new Boss(this, this.balasBoss);
    };

    createEnemies() {
        this.enemigos = this.physics.add.group();

        this.enemySpawnTimer = this.time.addEvent({
            delay: 500,
            repeat: -1,
            callback: () => this.spawnEnemy(),
            callbackScope: this
        });
    };

    spawnEnemy() {
        const enemigo = new Enemigo(this);
        this.enemigos.add(enemigo);
    };

    bulletCollision(bala, enemigo) {
        bala.destroy();

        this.atackSuccessSound = this.sound.add('atackSuccessSound', { volume: 0.3 });

        if (!enemigo.hasBeenHit) {
            this.atackSuccessSound.play();
            enemigo.hasBeenHit = true;
        };

        this.score += 25;
        this.scoreText.setText(`Puntos: ${this.score}`);
    };

    bossCollision(bala) {
        bala.destroy();

        this.boss.bossLife--;

        if (this.boss.bossLife <= 0) {
            this.score += 1000;
            this.scene.start('EscenaFinal', { score: this.score });
        };
    };

    handlePlayerDamage() {
        this.hurtSound = this.sound.add('hurtSound', { volume: 0.2 });
        this.loseSound = this.sound.add('loseSound', { volume: 0.2 });

        if (this.canLoseLife) {
            this.canLoseLife = false;

            if (!this.hurtSoundPlayed) {
                this.hurtSound.play();
                this.hurtSoundPlayed = true;
                this.nave.setTint(0xFF0000);
            };

            this.lifes--;
            this.score -= 50;
            this.lifeText.setText(`Vidas: ${this.lifes}`);
            this.scoreText.setText(`Puntos: ${this.score}`);

            if (this.lifes <= 0) {
                setTimeout(() => {
                    if (this.nave) {
                        this.hurtSoundPlayed = false;
                        this.canLoseLife = true;
                        this.loseSound.play();
                        this.scene.start('Pierde');
                    }
                }, 500);
            } else {
                // Aplicar un breve tiempo de invulnerabilidad
                this.nave.setAlpha(0.5);

                this.time.delayedCall(1000, () => {
                    this.hurtSoundPlayed = false;
                    this.canLoseLife = true;
                    this.nave.clearTint();
                    this.nave.setAlpha(1);
                });
            };
        };
    };
};

export default EscenaBase;