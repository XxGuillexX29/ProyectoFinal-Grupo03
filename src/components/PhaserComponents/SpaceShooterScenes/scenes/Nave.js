import Bala from "./Bala.js";

class Nave extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 100, 300, 'nave');

        this.scene = scene;
        this.soundPlayed = false;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.canDoubleShot = false;

        this.balas = scene.physics.add.group({});
        this.balas1 = scene.physics.add.group({});

        this.createAnimations();

        this.cursors = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            up2: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            down2: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    };

    createAnimations() {
        this.createAnimation('up_move', [2, 1, 0]);
        this.createAnimation('down_move', [2, 3, 4]);
        this.createAnimation('turn_idle', [2]);
    };

    createAnimation(key, frames) {
        if (!this.anims.get(key)) {
            this.scene.anims.create({
                key: key,
                frames: this.scene.anims.generateFrameNumbers('nave', { frames: frames }),
                frameRate: 5,
                repeat: 0,
                yoyo: true
            });
        };
    };

    update() {
        if (this.body) {
            if (this.cursors.up.isDown || this.cursors.up2.isDown) {
                this.setVelocityY(-160);
                this.anims.play('up_move', true);
            } else if (this.cursors.down.isDown || this.cursors.down2.isDown) {
                this.setVelocityY(160);
                this.anims.play('down_move', true);
            } else if (this.cursors.right.isDown || this.cursors.right2.isDown) {
                this.setVelocityX(160);
                this.anims.play('turn_idle', true);
            } else if (this.cursors.left.isDown || this.cursors.left2.isDown) {
                this.setVelocityX(-160);
                this.anims.play('turn_idle');
            } else {
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.anims.play('turn_idle');
            };

            if (this.cursors.space.isDown) {
                if (this.canDoubleShot) {
                    this.shoot(50, 35, this.balas);
                    this.shoot(30, 15, this.balas1);
                } else {
                    this.shoot(30, 15, this.balas);
                }
            }

            this.balas.children.iterate(bala => {
                console.log("this.balas.children:", this.balas.children);
                if (bala && bala.update) {
                    bala.update();
                }
            });

            this.balas1.children.iterate(bala => {
                console.log("this.balas1.children:", this.balas1.children);
                if (bala && bala.update) {
                    bala.update();
                }
            });
        };
    };

    shoot(posicion, velocidad, balas) {
        const atackSound = this.scene.sound.add('atackSound', { volume: 0.2 });

        if (!this.soundPlayed) {
            this.soundPlayed = true;
            atackSound.play();

            let bala1 = this.scene.physics.add.existing(new Bala(this.scene, this.x + posicion, this.y, velocidad));
            balas.add(bala1);

            if (this.canDoubleShot && this.body) {
                bala1.y = this.y + 20;
                let bala2 = this.scene.physics.add.existing(new Bala(this.scene, this.x + posicion, this.y - 20, velocidad));
                balas.add(bala2);

                this.balas1.add(bala1);
                this.balas1.add(bala2);
            };

            this.scene.time.delayedCall(350, () => {
                this.soundPlayed = false;
            });
        };
    };

    enableDoubleShot() {
        this.canDoubleShot = true;

        this.scene.time.delayedCall(4000, () => {
            this.canDoubleShot = false;
        });
    };
};

export default Nave;