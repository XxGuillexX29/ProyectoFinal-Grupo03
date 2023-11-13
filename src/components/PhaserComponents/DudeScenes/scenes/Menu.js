class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
        this.text;
    };

    preload() {
        this.load.audio('startSound', '../assetsDude/sounds/startSound.mp3');

        this.load.image('Gana', '../assetsDude/img/sky.png');
    };

    create() {
        this.startSound = this.sound.add('startSound');
        this.startSound.volume = 0.5;

        this.add.image(600, 300, 'Gana').setScale(1.5, 1.5);

        this.text = this.add.text(600, 300, 'PUNK DUDE', {
            fontFamily: 'VT323, monospace', fontSize: '84px', fill: '#F9F9F9'
        });
        this.text.setOrigin(0.5, 1.5);

        this.text = this.add.text(600, 300, 'PRESIONA ENTER PARA EMPEZAR', {
            fontFamily: 'VT323, monospace', fontSize: '40px', fill: '#F4C430'
        });
        this.text.setOrigin(0.5, 0);

        this.input.keyboard.on('keydown-ENTER', () => {
            this.startSound.play();
            this.scene.start('Escena1');
        });
    };
};

export default Menu;