class Bala extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, velocidad) {
        super(scene, x, y, 'bala');
        scene.add.existing(this);

        this.velocidad = velocidad

        if (!this.anims.get('shooter')) {
            this.anims.create({
                key: 'shooter',
                frames: scene.anims.generateFrameNumbers('bala', { start: 0, end: 1 }),
                frameRate: 8,
                repeat: -1,
                yoyo: true
            });
        };
    };

    update() {
        this.x += this.velocidad;
        this.anims.play('shooter', true);
        if (this.x <= 0 || this.x > this.scene.sys.canvas.width) {
            this.destroy();
        };
    };
};

export default Bala;
