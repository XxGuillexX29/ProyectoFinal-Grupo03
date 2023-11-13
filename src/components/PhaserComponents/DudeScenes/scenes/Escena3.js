import EscenaBase from "./EscenaBase.js";

class Escena3 extends EscenaBase {
    constructor() {
        super("Escena3");
        this.scoreToCatch = 20;
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
    };

    update() {
        super.update();

        if (this.score == 0) {
            this.player.anims.play('new_scene', true);
            setTimeout(() => {
                this.scene.start('Gana', { starsCollected: this.starsCollected });
            }, 1000);
        };
    };
};

export default Escena3;