import EscenaBase from "./EscenaBase.js";

class Escena2 extends EscenaBase {
    constructor() {
        super("Escena2");
        this.scoreToCatch = 16;
    };

    init(data) {
        this.starsCollected = data.starsCollected;
    };

    create() {
        this.score = this.scoreToCatch;

        super.create();

        this.platforms.create(100, 400, 'platform').setScale(0.5, 1).refreshBody().setTint(0xFF00FF);
        this.platforms.create(-550, 250, 'platform').setTint(0xFF00FF);
        this.platforms.create(900, 410, 'platform2').setScale(0.5, 1).refreshBody().setTint(0xFF00FF);
        this.platforms.create(900, 220, 'platform').setScale(0.5, 1).refreshBody().setTint(0xFF00FF);

        this.platforms.create(500, 568, 'platform').setTint(0xFF00FF);

        this.createSandwich(this.scoreToCatch, 50, 60);

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.sandwich, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(this.player, this.sandwich, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    };

    update() {
        super.update();

        if (this.score == 0) {
            setTimeout(() => {
                this.scene.start('Escena3', { starsCollected: this.starsCollected });
            }, 1000);
        };
    };
};

export default Escena2;