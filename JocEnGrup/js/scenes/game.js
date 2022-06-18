class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.player = null;
        this.puntuacio = 0;
        this.pause = false;
        this.partida = 1;
        this.velocitat = 0;
    }	
 
    preload (){	
    	this.load.image('carrils', '../resources/Background.png')
    	this.load.image('resume', '../resources/Resume.png')
    	this.load.image('save', '../resources/Save.png')
    	this.load.image('exit', '../resources/Exit.png')
		this.load.spritesheet('soldat', '../resources/spritesheet.png',{ frameWidth: 182, frameHeight: 150 })

	}
	
    create (){	
		this.add.image(600, 400, 'carrils');	
		
		this.player = this.physics.add.sprite(600, 800, 'soldat')
		this.player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'corrent',
			frames: this.anims.generateFrameNumbers('soldat', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: -1
	 	});

	 	this.cursors = this.input.keyboard.createCursorKeys();
	 	this.cursors.P=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P,true,true);
		this.cursors.R=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R,true,true);
	}

	pausa(){
		this.physics.pause();
		this.pause = !this.pause;
  		var botoResume = this.add.image(600, 200, 'resume');
        var botoSave = this.add.image(600, 500, 'save');
        var botoExit = this.add.image(600, 800, 'exit');

        botoResume.setInteractive();
        botoResume.on('pointerup', () => {
            this.pause = !this.pause;
            this.physics.resume();
            botoResume.destroy();
            botoSave.destroy();
            botoExit.destroy();
        }, this);

        botoExit.setInteractive();
    	botoExit.on('pointerup', () => {
			loadpage("../");	
		}, this);

        botoSave.setInteractive();
        botoSave.on('pointerup', () => {
			options_data.puntuacio = this.puntuacio;
			options_data.velocitat = this.velocitat;
			sessionStorage.setItem("config", JSON.stringify(options_data));
			loadpage("../");
        }, this);
    }    
	

	update (){

		if(this.cursors.P.isDown && !this.pause){ 
			console.log("Pinya")
			this.pausa();
		}

		this.player.anims.play('corrent', true);
		if (this.cursors.left.isDown){
			this.player.setDrag(2000);
			this.player.setVelocityX(-320);
		}

		if (this.cursors.right.isDown){
			this.player.setDrag(2000);
			this.player.setVelocityX(320);
		}
	}

}

