class Jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'punkWalk');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.newScenePlayed = false;

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        if (!scene.anims.exists('punk_dead')) {
            scene.anims.create({
                key: 'punk_dead',
                frames: scene.anims.generateFrameNumbers('punkDead', { start: 15, end: 8 }),
                frameRate: 10
            });
        };
        if (!scene.anims.exists('turn_idle_RIGHT')) {
            scene.anims.create({
                key: 'turn_idle_RIGHT',
                frames: scene.anims.generateFrameNumbers('punkIdle', { start: 4, end: 7 }),
                frameRate: 5
            });
        };
        if (!scene.anims.exists('turn_idle_LEFT')) {
            scene.anims.create({
                key: 'turn_idle_LEFT',
                frames: scene.anims.generateFrameNumbers('punkIdle', { start: 0, end: 3 }),
                frameRate: 5
            });
        };
        if (!scene.anims.exists('right_walk')) {
            scene.anims.create({
                key: 'right_walk',
                frames: scene.anims.generateFrameNumbers('punkWalk', { start: 8, end: 14 }),
                frameRate: 10,
                repeat: -1
            });
        };
        if (!scene.anims.exists('left_walk')) {
            scene.anims.create({
                key: 'left_walk',
                frames: scene.anims.generateFrameNumbers('punkWalk', { start: 7, end: 0 }),
                frameRate: 10,
                repeat: -1
            });
        };
        if (!scene.anims.exists('new_scene')) {
            scene.anims.create({
                key: 'new_scene',
                frames: scene.anims.generateFrameNumbers('punkTP', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
        };

        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            up2: Phaser.Input.Keyboard.KeyCodes.UP
        });
    };

    update() {
        if (this.body) {
            if (this.cursors.left.isDown || this.cursors.left2.isDown) {
                this.setVelocityX(-160);
                this.anims.play('left_walk', true);
            } else if (this.cursors.right.isDown || this.cursors.right2.isDown) {
                this.setVelocityX(160);
                this.anims.play('right_walk', true);
            } else if (this.cursors.right.isUp && this.cursors.right2.isUp) {
                this.setVelocityX(0);
                this.anims.play('turn_idle_RIGHT', true);
            } else if (this.cursors.left.isUp && this.cursors.left2.isUp) {
                this.setVelocityX(0);
                this.anims.play('turn_idle_LEFT', true);
            } else {
                this.setVelocityX(0);
            }

            if ((this.cursors.up.isDown || this.cursors.up2.isDown) && this.body.touching.down) {
                this.setVelocityY(-330);
                this.scene.jumpSound.play();
            };
        };

        if (this.scene.scoreToCatch === 0 && !this.newScenePlayed) {
            this.anims.play('new_scene', true);
            this.newScenePlayed = true;
        } else if (this.scene.scoreToCatch != 0) {
            this.newScenePlayed = false;
        };
    };
};

export default Jugador;