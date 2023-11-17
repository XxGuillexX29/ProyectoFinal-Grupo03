import EscenaBase from "./EscenaBase.js";

class EscenaMedia extends EscenaBase {
    constructor() {
        super("EscenaMedia");
    };

    init(data) {
        this.score = data.score;
        this.lifes = data.lifes;
    };

    create() {
        this.add.image(600, 300, 'fondo');
        this.add.image(300, 300, 'fondo2');

        this.createPlayer();
        this.createEnemies();

        this.physics.add.collider(this.nave.balas, this.enemigos, this.bulletCollision, null, this);
        this.physics.add.collider(this.nave.balas1, this.enemigos, this.bulletCollision, null, this);
        this.physics.add.collider(this.nave, this.enemigos, this.handlePlayerDamage, null, this);

        this.lifeText = this.add.text(16, 16, `Vidas: ${this.lifes}`, {
            fontFamily: 'VT323, monospace', fontSize: '52px', fill: '#F9F9F9'
        });

        this.scoreText = this.add.text(814, 520, `Puntos: ${this.score}`, {
            fontFamily: 'VT323, monospace', fontSize: '52px', fill: '#F9F9F9'
        });

        this.powerUp = this.physics.add.sprite(200, 200, 'powerUp').setScale(2);
        this.physics.add.collider(this.powerUp, this.enemigos);
        this.setRandomPowerUpPosition();

        this.powerUp.setCollideWorldBounds(true);
        this.powerUp.setBounce(1, 1);

        this.movePowerUpRandomly();
    };

    collectPowerUp(nave, powerUp) {
        powerUp.destroy();

        if (!this.nave.isDestroyed) {
            this.nave.enableDoubleShot();
        };
    };

    update() {
        this.nave.update(this.input.keyboard.createCursorKeys());
        this.enemigos.children.iterate(enemigo => {
            if (enemigo && enemigo.update) {
                enemigo.update();
            }
        });

        this.physics.add.overlap(this.nave, this.powerUp, this.collectPowerUp, null, this);

        if (this.score >= 600) {
            this.scene.start('EscenaFinal', { score: this.score, lifes: this.lifes }, { reset: true });
        };
    };

    setRandomPowerUpPosition() {
        const randomXY = Phaser.Math.Between(0, 500);
        this.powerUp.setX(randomXY);
        this.powerUp.setY(-randomXY);
    };

    movePowerUpRandomly() {
        const speed = 100;

        // Selecciona un ángulo diagonal aleatorio entre 45 y 135 grados.
        const angle = Phaser.Math.Between(45, 135);

        // Agrega la velocidad multiplicada por el coseno o el seno del angulo.
        const velocityX = speed * Math.cos(Phaser.Math.DegToRad(angle));
        const velocityY = speed * Math.sin(Phaser.Math.DegToRad(angle));

        this.powerUp.setVelocity(velocityX, velocityY);
    };
};

export default EscenaMedia;