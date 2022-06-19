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
    	this.load.image('misil', '../resources/Misil.png')
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

		this.misilGroup = this.physics.add.group();

		const crearMisil = () => {
	      const myX = Phaser.Math.Between(100, 900);
	      const cohet = this.misilGroup.create(1300, myX, 'misil').setScale(0.3);
	      cohet.setVelocityY(-200);
	      cohet.setDepth(6);
	      cohet.setSize(cohet.displayWidth - 10, cohet.displayHeight - 10);
	    };

	    this.misilTemps = this.time.addEvent({
	      callback: crearMisil,
	      delay: Phaser.Math.Between(2500, 5000),
	      callbackScope: this,
	      loop: true,
	    });

	 	this.cursors = this.input.keyboard.createCursorKeys();
	 	this.cursors.P=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P,true,true);
		this.cursors.R=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R,true,true);
	}

	save(){
		var options_data;
		options_data.puntuacio = this.puntuacio;
		options_data.velocitat = this.velocitat;

    	let arrayPartides = [];

    	if (localStorage.partides){
    		arrayPartides = JSON.parse(localStorage.partides);
    	}

    	arrayPartides.push(options_data);

		localStorage.partides.setItem ("partides", JSON.stringify(arrayPartides));
	}

	pausa(){
		this.physics.pause();
		this.pause = !this.pause;
  		var botoResume = this.add.image(600, 250, 'resume');
        var botoSave = this.add.image(600, 500, 'save');
        var botoExit = this.add.image(600, 750, 'exit');

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
        	
        	this.save();
        	
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

