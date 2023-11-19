import EscenaBase from "./EscenaBase.js";

class Escena3 extends EscenaBase {
    constructor() {
        super("Escena3");
        this.scoreToCatch = 20;
        this.timer = 5;
        this.displayTimer = null;
        this.bombGenerationEvent = null;
    };

    init(data) {
        this.starsCollected = data.starsCollected;
    };

    create() {
        this.score = this.scoreToCatch;

        super.create();

        this.platforms.create(500, 500, 'platform2').setScale(0.4, 0.5).refreshBody().setTint(0xF00000);
        this.platforms.create(-400, 250, 'platform').setTint(0xF00000);
        this.platforms.create(1050, 550, 'platform2').setTint(0xF00000);
        this.platforms.create(650, 270, 'platform').setScale(0.2, 1).refreshBody().setTint(0xF00000);

        this.platforms.create(500, 568, 'platform').setTint(0xF00000);

        this.createSandwich(this.scoreToCatch, 35, 50);

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.sandwich, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(this.player, this.sandwich, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.initializeTimer();

        this.displayTimer = this.add.text(250, 550, `Tiempo para la lluvia de bombas: ${this.timer}`, {
            fontFamily: 'VT323, monospace',
            fontSize: '48px',
            fill: '#F4C430'
        });
    };

    initializeTimer() {
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    };

    updateTimer() {
        this.timer--;

        // Actualizar la visualización del temporizador
        this.displayTimer.text = `Tiempo para la lluvia de bombas: ${Math.max(0, this.timer)}`;

        if (this.timer <= 0) {
            this.timerEvent.destroy();
            this.generateBombs();
        };
    };

    generateBombs() {
        this.bombGenerationEvent = this.time.addEvent({
            delay: 1700,
            callback: () => {
                const x = Phaser.Math.Between(0, this.physics.world.bounds.width);
                const bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            },
            callbackScope: this,
            loop: true
        });
    };

    update() {
        super.update();

        if (this.starsCollected === this.scoreToCatch) {
            setTimeout(() => {
                this.scene.start('Gana', { starsCollected: this.starsCollected });
            }, 1000);
        };
        if (this.score == 0) {
            setTimeout(() => {
                this.scene.start('Gana');;
            }, 1000);
        };
    };
};

export default Escena3;