export default class endScene extends Phaser.Scene {
    constructor(){
        super('endScene');
    }


    preload(){

    }

    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.add.text(this.add.text(80,200, ' Congratulations! ', {fontSize: '40px', fontStyle: 'bold', fill: '#ffffff' }));
        let main = this.add.text(100, 300, 'Main Menu', {fontSize: '30px', fill: '#ff0033'});
        main.setInteractive({useHandCursor:true});
        main.on('pointerdown', ()=> this.menuButton());
        let restart = this.add.text(360,300,'Restart', {fontSize:'30px', fill:'#ff0033'});
        restart.setInteractive({useHandCursor:true});
        restart.on('pointerdown',() => this.restartButton());

    }

    menuButton(){
        console.log("Loading Main Menu...");
        this.scene.start('menuScene');
    }

    restartButton(){
        console.log("Restarting...");
        this.scene.start('gameScene');
        
    }
        
    }
