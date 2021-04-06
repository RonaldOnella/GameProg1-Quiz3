export default class menuScene extends Phaser.Scene {

    constructor(){
        super('menuScene');
    }

    preload(){
        

    }

    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        let start = this.add.text(100,100, 'Start Game', {fontSize: '25px',fill: '#FF0000'});
        this.add.text(100,250, 'Instructions:' , {fontSize:'20px'});
        this.add.text(100,300, 'Collect all coins and reach', {fontSize:'20px'});
        this.add.text(100,350, 'the exit' , {fontSize:'20px'});
        start.setOrigin(0,0);
        start.setInteractive({useHandCursor: true});
        start.on('pointerdown', () => this.startButton());
    }

    startButton(){
        console.log("Game Start!");
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.scene.start('gameScene');
        

    }
}