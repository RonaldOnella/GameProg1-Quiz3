let gameOptions = {
    playerSpeed: 50
}


export default class gameScene extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }


    preload(){
        this.load.tilemapTiledJSON('tileMap','level.json');
        this.load.image('walls', './assets/images/Minifantasy_DungeonWallTiles.png');
        this.load.image('floor', './assets/images/Minifantasy_DungeonFloorTiles.png');
        this.load.image('knight', './assets/images/knight.png');
        this.load.spritesheet('port', './assets/images/gemPort.png', {frameWidth: 8 , frameHeight: 8});
        this.load.spritesheet('hero','./assets/images/hero.png', {frameWidth: 8, frameHeight: 8});
        this.load.spritesheet('coin','./assets/images/GoldCoinSpinning.png', {frameWidth: 8, frameHeight: 8});
    }

    create(){

        this.cc = 5

        //anims
        const idleConfig1 = {
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('hero',{start:0,end:7}),
            framerate: 32,
            repeat: -1
        }

        const idleConfig2 = {
            key: 'idle',
            frames: this.anims.generateFrameNumbers('hero',{start:8,end:15}),
            framerate: 32,
            repeat: -1
        }

        const leftAnim = {
            key: 'leftWalk',
            frames: this.anims.generateFrameNumbers('hero',{start: 20, end: 23}),
            framerate: 4,
            repeat: -1
        }
        
        const rightAnim = {
            key: 'rightWalk',
            frames: this.anims.generateFrameNumbers('hero', {start:16, end: 19}),
            framerate: 4,
            repeat: -1
        }

        const upAnim = {
            key: 'upWalk',
            frames: this.anims.generateFrameNumbers('hero', {start:24, end: 27}),
            framerate:4,
            repeat: -1
        }

        const coinSpin ={
            key: 'coinAnim',
            frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 23}),
            frameRate: 16   ,
            repeat: -1
        }

        const portSpin ={
            key: 'portAnim',
            frames: this.anims.generateFrameNumbers('port', {start: 0, end: 10}),
            frameRate: 16   ,
            repeat: -1
        }

        this.anims.create(portSpin)
        this.anims.create(coinSpin);
        this.anims.create(idleConfig1);
        this.anims.create(idleConfig2);
        this.anims.create(leftAnim);
        this.anims.create(rightAnim);
        this.anims.create(upAnim);

        

        //tiledMap floor
        this.floor = this.make.tilemap({
            key: 'tileMap'
        });
        let tile3 = this.floor.addTilesetImage('floors','floor');
        this.layer3 =this.floor.createLayer('floorLayer', tile3);


        this.map = this.make.tilemap({
            key: 'tileMap'
        });


         //coins 
         this.coinLayer = this.map.getObjectLayer('collectibles')['objects'];
         this.coins = this.physics.add.staticGroup();
         this.coinLayer.forEach(object => {
             this.cn = this.coins.create(object.x,object.y, 'coin')
             this.cn.setScale(object.width/8, object.height/8);
             this.cn.setOrigin(0,1);
             this.cn.body.width = object.width;
             this.cn.body.height = object.height;
             this.anims.play('coinAnim',this.cn)
         });
         this.coins.refresh();
         console.log(this.coins);

         this.knightLayer = this.map.getObjectLayer('block')['objects'];
         this.knight = this.physics.add.staticGroup();
         this.knightLayer.forEach(object => {
             this.kn = this.knight.create(object.x,object.y, 'knight')
             this.kn.setScale(object.width/8, object.height/14);
             this.kn.setOrigin(0,1);
             this.kn.body.width = object.width;
             this.kn.body.height = object.height;
             
         });
         this.knight.refresh();
         


        //tiledMap walls
        
        let tile = this.map.addTilesetImage('walls','walls');
        this.layer = this.map.createLayer('wallLayer', tile);
        this.map.setCollisionBetween(1,99, true, this.layer);
        

        //character
        this.hero = this.physics.add.sprite(15,175, 'hero', 0);
        this.hero.enableBody =true;
        this.hero.play('idleLeft')


        //ports

        this.port1Layer = this.map.getObjectLayer('port1')['objects'];
         this.port1Obj = this.physics.add.staticGroup();
         this.port1Layer.forEach(object => {
             this.p1 = this.port1Obj.create(object.x,object.y, 'items')
             this.p1.setScale(object.width/8, object.height/8);
             this.p1.setOrigin(0,1);
             this.p1.body.width = object.width;
             this.p1.body.height = object.height;
             this.anims.play('portAnim',this.p1)
         });
         this.port1Obj.refresh();

         this.port2Layer = this.map.getObjectLayer('port2')['objects'];
         this.port2Obj = this.physics.add.staticGroup();
         this.port2Layer.forEach(object => {
             this.p2 = this.port2Obj.create(object.x,object.y, 'items')
             this.p2.setScale(object.width/8, object.height/8);
             this.p2.setOrigin(0,1);
             this.p2.body.width = object.width;
             this.p2.body.height = object.height;
             this.anims.play('portAnim',this.p2)
         });
         this.port2Obj.refresh();

         this.port3Layer = this.map.getObjectLayer('port3')['objects'];
         this.port3Obj = this.physics.add.staticGroup();
         this.port3Layer.forEach(object => {
             this.p3 = this.port3Obj.create(object.x,object.y, 'items')
             this.p3.setScale(object.width/8, object.height/8);
             this.p3.setOrigin(0,1);
             this.p3.body.width = object.width;
             this.p3.body.height = object.height;
             this.anims.play('portAnim',this.p3)
         });

         this.port3Obj.refresh();


         this.port4Layer = this.map.getObjectLayer('port4')['objects'];
         this.port4Obj = this.physics.add.staticGroup();
         this.port4Layer.forEach(object => {
             this.p4 = this.port4Obj.create(object.x,object.y, 'items')
             this.p4.setScale(object.width/8, object.height/8);
             this.p4.setOrigin(0,1);
             this.p4.body.width = object.width;
             this.p4.body.height = object.height;
             this.anims.play('portAnim',this.p4)
         });
         this.port4Obj.refresh();

         this.port5Layer = this.map.getObjectLayer('port5')['objects'];
         this.port5Obj = this.physics.add.staticGroup();
         this.port5Layer.forEach(object => {
             this.p5 = this.port5Obj.create(object.x,object.y, 'items')
             this.p5.setScale(object.width/8, object.height/8);
             this.p5.setOrigin(0,1);
             this.p5.body.width = object.width;
             this.p5.body.height = object.height;
             this.anims.play('portAnim',this.p5)
         });
         this.port5Obj.refresh();

         this.portfLayer = this.map.getObjectLayer('portFinal')['objects'];
         this.portfObj = this.physics.add.staticGroup();
         this.portfLayer.forEach(object => {
             this.pf = this.portfObj.create(object.x,object.y, 'items')
             this.pf.setScale(object.width/8, object.height/8);
             this.pf.setOrigin(0,1);
             this.pf.body.width = object.width;
             this.pf.body.height = object.height;
             this.anims.play('portAnim',this.pf)
         });
         this.portfObj.refresh();

         this.portfinLayer = this.map.getObjectLayer('fin')['objects'];
         this.portfinObj = this.physics.add.staticGroup();
         this.portfinLayer.forEach(object => {
             this.pfin = this.portfinObj.create(object.x,object.y, 'items')
             this.pfin.setScale(object.width/8, object.height/8);
             this.pfin.setOrigin(0,1);
             this.pfin.body.width = object.width;
             this.pfin.body.height = object.height;
             this.anims.play('portAnim',this.pfin)
         });
         this.portfinObj.refresh();

         this.port1dLayer = this.map.getObjectLayer('port1Dest')['objects'];
         this.port1dObj = this.physics.add.staticGroup();
         this.port1dLayer.forEach(object => {
             this.p1d = this.port1dObj.create(object.x,object.y, 'items')
             this.p1d.setScale(object.width/8, object.height/8);
             this.p1d.setOrigin(0,1);
             this.p1d.body.width = object.width;
             this.p1d.body.height = object.height;
             this.anims.play('portAnim',this.p1d)
         });
         this.port1dObj.refresh();

         this.port2dLayer = this.map.getObjectLayer('port2Dest')['objects'];
         this.port2dObj = this.physics.add.staticGroup();
         this.port2dLayer.forEach(object => {
             this.p2d = this.port2dObj.create(object.x,object.y, 'items')
             this.p2d.setScale(object.width/8, object.height/8);
             this.p2d.setOrigin(0,1);
             this.p2d.body.width = object.width;
             this.p2d.body.height = object.height;
             this.anims.play('portAnim',this.p2d)
         });
         this.port2dObj.refresh();

         this.port3dLayer = this.map.getObjectLayer('port3Dest')['objects'];
         this.port3dObj = this.physics.add.staticGroup();
         this.port3dLayer.forEach(object => {
             this.p3d = this.port3dObj.create(object.x,object.y, 'items')
             this.p3d.setScale(object.width/8, object.height/8);
             this.p3d.setOrigin(0,1);
             this.p3d.body.width = object.width;
             this.p3d.body.height = object.height;
             this.anims.play('portAnim',this.p3d)
         });
         this.port3dObj.refresh();

         this.port4dLayer = this.map.getObjectLayer('port4Dest')['objects'];
         this.port4dObj = this.physics.add.staticGroup();
         this.port4dLayer.forEach(object => {
             this.p4d = this.port4dObj.create(object.x,object.y, 'items')
             this.p4d.setScale(object.width/8, object.height/8);
             this.p4d.setOrigin(0,1);
             this.p4d.body.width = object.width;
             this.p4d.body.height = object.height;
             this.anims.play('portAnim',this.p4d)
         });
         this.port4dObj.refresh();

        //topWalls
        this.wallTop = this.make.tilemap({
            key: 'tileMap'
        });
        let tile2 = this.wallTop.addTilesetImage('walls','walls');
        this.layer2 = this.wallTop.createLayer('wallTop', tile2);

        
        //controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.enabled = true;

        
        
        //camera
        this.goal = this.add.text(270,265, this.cc, {fontSize: '10px'});
        this.goal.setScrollFactor(0);
        this.goal.setDepth(5);
        this.cameras.main.setBounds(0,0,200,200);
        this.cameras.main.setZoom(8);
        this.cameras.main.startFollow(this.hero);
        this.cameras.main.setDeadzone(30,30);

        //collisions
        this.physics.add.overlap(this.hero,this.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.hero, this.port1Obj, this.tp1, null, this);
        this.physics.add.overlap(this.hero, this.port1dObj, this.tp1d, null, this);
        this.physics.add.overlap(this.hero, this.port2Obj, this.tp2, null, this);
        this.physics.add.overlap(this.hero, this.port2dObj, this.tp1, null, this);
        this.physics.add.overlap(this.hero, this.port3Obj, this.tp3, null, this);
        this.physics.add.overlap(this.hero, this.port3dObj, this.tp3d, null, this);
        this.physics.add.overlap(this.hero, this.port4Obj, this.tp4, null, this);
        this.physics.add.overlap(this.hero, this.port4dObj, this.tp4d, null, this);
        this.physics.add.collider(this.hero,this.knight)
        this.physics.add.collider(this.hero, this.layer)
        this.physics.add.overlap(this.hero,this.port5Obj, this.tp5,null, this);
        this.physics.add.overlap(this.hero,this.portfObj, this.tpf,null, this);
        this.physics.add.overlap(this.hero,this.portfinObj, this.finish,null, this);
        this.hero.setCollideWorldBounds(true);
        
        
    }

    collectCoin(hero,cn){
        cn.destroy(cn.x,cn.y);
        this.cc -= 1;
        this.goal.setText(this.cc);
        return false;
    }

    tp1(hero,p1){
        hero.setPosition(115,100);
    }
    tp1d(hero,p1d){
        hero.setPosition(80,180);
    }

    tp3d(hero,p3d){
        hero.setPosition(45,150);
    }
    tp3(hero,p3d){
        hero.setPosition(132,134);
    }

    tp4(hero,p4){
        hero.setPosition(12,45)

    }
    
    tp4d(hero,p4d){
        hero.setPosition(45,90)
    }

    tp2(hero,p1){
        hero.setPosition(83,98);
    }

    tp5(hero,p5){
        hero.setPosition(156,177);
    }

    tpf(hero,pf){
        hero.setPosition(160,20);
    }

    finish(hero,pfin){
        if (this.cc > 1 ){
            hero.setPosition(180,68)
        }
        else if (this.cc == 1){
            hero.setPosition(180,68);
        }
        else if (this.cc == 0){
            this.scene.start('endScene');
            return false;
            
        }
    }
    update(){
        
        //charmovement 
        this.hero.body.velocity.y = this.cursors.up.isDown ? (this.cursors.down.isDown ? 0 : -1 * gameOptions.playerSpeed) : (this.cursors.down.isDown ? gameOptions.playerSpeed : 0);
        this.hero.body.velocity.x = this.cursors.left.isDown ? (this.cursors.right.isDown ? 0 : -1 * gameOptions.playerSpeed) : (this.cursors.right.isDown ? gameOptions.playerSpeed : 0);
        

        if(this.cursors.left.isDown || (this.cursors.left.isDown && this.cursors.down.isDown)){
            this.hero.play('leftWalk',true);
            this.cursors.left.on('up', () =>
                this.hero.play('idleLeft'),
            );
            this.cursors.down.on('up', () =>
            this.hero.play('idleLeft'),
            );
        }
        else if (this.cursors.right.isDown || this.cursors.down.isDown || (this.cursors.right.isDown && this.cursors.down.isDown)){
            this.hero.play('rightWalk',true);
            
            this.cursors.right.on('up', () =>
                this.hero.play('idle'),   
                
            );
            this.cursors.down.on('up', () =>
            this.hero.play('idle'),
            );
        }
        else if (this.cursors.up.isDown){   
            this.hero.play('upWalk',true);
            this.cursors.up.on('up', () =>
                this.hero.play('idleLeft'),        
            );

        }
        
    }

}
