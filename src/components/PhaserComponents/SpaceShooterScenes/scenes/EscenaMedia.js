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
        //Imagenes
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

        const randomX = Phaser.Math.Between(0, 500);
        const randomY = Phaser.Math.Between(0, 550);
        this.powerUp = this.physics.add.sprite(200, 200, 'powerUp').setScale(2);;
        this.physics.add.collider(this.powerUp, this.enemigos);
        this.powerUp.setX(randomX);
        this.powerUp.setY(randomY);
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
            };
        });

        this.physics.add.overlap(this.nave, this.powerUp, this.collectPowerUp, null, this);

        if (this.score >= 600) {
            this.scene.start('EscenaFinal', { score: this.score, lifes: this.lifes }, { reset: true });
        };
    };
};

export default EscenaMedia;