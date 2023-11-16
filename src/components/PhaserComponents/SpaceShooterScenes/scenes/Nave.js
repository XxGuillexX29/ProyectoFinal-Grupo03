import Bala from "./Bala.js";

class Nave extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, balas, balas1) {
        super(scene, 100, 300, 'nave');

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.balas = balas;
        this.balas1 = balas1;
        this.setCollideWorldBounds(true);
        this.canDoubleShot = false;

        this.balas = this.scene.physics.add.group({});

        this.balas1 = this.scene.physics.add.group({});

        if (!this.anims.get('up_move')) {
            scene.anims.create({
                key: 'up_move',
                frames: scene.anims.generateFrameNumbers('nave', { start: 2, end: 0 }),
                frameRate: 5,
                repeat: 0,
                yoyo: true
            });
        };

        if (!this.anims.get('down_move')) {
            scene.anims.create({
                key: 'down_move',
                frames: scene.anims.generateFrameNumbers('nave', { start: 2, end: 4 }),
                frameRate: 5,
                repeat: 0,
                yoyo: true
            });
        };

        if (!this.anims.get('turn_idle')) {
            scene.anims.create({
                key: 'turn_idle',
                frames: [{ key: 'nave', frame: 2 }],
                frameRate: 4,
                repeat: -1,
                yoyo: true
            });
        };

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

    create() {
    }

    update() {

        this.balas.children.iterate(bala => {
            if (bala && bala.update) {
                bala.update();
            }
        });

        this.balas1.children.iterate(bala => {
            if (bala && bala.update) {
                bala.update();
            }
        });

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
        };
    };

    shoot(posicion, velocidad, balas) {
        const atackSound = this.scene.sound.add('atackSound', { volume: 0.2 });

        if (!this.scene.soundPlayed) {
            this.scene.soundPlayed = true;
            atackSound.play();

            // Disparar balas normales
            let bala1 = this.scene.physics.add.existing(new Bala(this.scene, this.x + posicion, this.y, velocidad));
            balas.add(bala1);

            // Disparar balas dobles si canDoubleShot es true
            if (this.canDoubleShot && this.body) {
                bala1.y = this.y + 20;
                let bala2 = this.scene.physics.add.existing(new Bala(this.scene, this.x + posicion, this.y - 20, velocidad));
                balas.add(bala2);

                // Guardar las balas dobles en el grupo balas1
                this.balas1.add(bala1);
                this.balas1.add(bala2);
            }

            this.scene.time.delayedCall(350, () => {
                this.scene.soundPlayed = false;
            });
        }
    }

    enableDoubleShot() {
        this.canDoubleShot = true;

        this.scene.time.delayedCall(4000, () => {
            this.canDoubleShot = false;
        });
    };

    cleanBullets() {
        this.balas.clear(true, true);
        this.balas1.clear(true, true);
    }

};

export default Nave;
