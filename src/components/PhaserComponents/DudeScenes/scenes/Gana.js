class Gana extends Phaser.Scene {
    constructor() {
        super("Gana");
        this.text;
    };

    preload() {
        this.load.audio('startSound', '../assetsDude/sounds/startSound.mp3');

        this.load.image('gana', '../assetsDude/img/Gana.png');
    };

    create() {
        this.startSound = this.sound.add('startSound');

        this.add.image(600, 300, 'gana').setScale(1.2, 1.2);
        
        const overlay = this.add.rectangle(0, 0, 1200, 600, 0x000000, 0.5);
        overlay.setOrigin(0);

        this.text = this.add.text(600, 150, '¡Ganaste!', {
            fontFamily: 'VT323, monospace', fontSize: '84px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 1.5);

        this.text = this.add.text(600, 500, 'PRESIONA R PARA REINICIAR', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F9F9F9'
        });
        this.text.setOrigin(0.5, 0);

        this.text = this.add.text(600, 550, 'PRESIONA ENTER PARA VOLVER AL MENU', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F9F9F9'
        });
        this.text.setOrigin(0.5, 0);

        this.input.keyboard.on('keydown-R', () => {
            this.physics.resume();
            this.startSound.play();
            this.scene.start('Escena1');
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.startSound.play();
            this.scene.start('Menu');
        });
    };
};

export default Gana;