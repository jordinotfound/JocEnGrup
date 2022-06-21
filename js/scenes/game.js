class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.nom = "";
        this.player = null;
        this.puntuacio = 0;
        this.pause = false;
        this.partida = 1;
        this.velocitat = 1;
        this.score_text = 0;
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

    	let nomJug = sessionStorage.username;
    	this.nom = nomJug;

    	var idpartida = sessionStorage.idPartida;
    	console.log(idpartida)

    	var json = localStorage.getItem("runner")
       	var cimbrel = JSON.parse(json);
       	var options_data = {}
       	options_data.puntuacio = cimbrel[idpartida].puntuacio;
   		options_data.velocitat = cimbrel[idpartida].velocitat;
    	this.puntuacio = options_data.puntuacio;
    	this.velocitat = options_data.velocitat;

		this.add.image(600, 400, 'carrils');	
		
		this.player = this.physics.add.sprite(600, 800, 'soldat')
		this.player.setCollideWorldBounds(true);

		this.score_text = this.add.text(16,16, 'Score : ' + this.puntuacio ,{ fontSize: '32px', fill: '#FFFFFF'})

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
		    cohet.flipY = true;
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
		var dades_partida = {};
		dades_partida.nom = this.nom;
		dades_partida.puntuacio = this.puntuacio;
		dades_partida.velocitat = this.velocitat;

    	let arrayPartidesVladdy = [];

    	if (localStorage.runner){
    		arrayPartidesVladdy = JSON.parse(localStorage.runner);
    	}

    	arrayPartidesVladdy.push(dades_partida);

		localStorage.runner = JSON.stringify(arrayPartidesVladdy);
	}

	createMissile(height, texture) {
	    const missile = this.missileGroup.create(1200 + 100, height, texture);
	    missile.setScale(0.1);
	    missile.setDepth(6);
	    missile.setSize(missile.width, missile.height - 300);
	    missile.setOffset(0, 150);
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

		this.score_text.setText('Score: ' + this.puntuacio)


		if(this.cursors.P.isDown && !this.pause){ 
			console.log(this.nom);
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

		if(this.velocitat < 500){
			if (!this.pause) this.velocitat = this.velocitat + 0.01;
		}

		if (!this.pause) this.puntuacio += (1 * this.velocitat)*100;

		/*this.temps += delta;
    	
    	if (this.timer >= 5000) {
    	  	this.createMissile(415, 'missile');
    		this.timer = 0;
   		}*/

	}

}

