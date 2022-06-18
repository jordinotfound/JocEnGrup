class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.player = null;
    }	
 
    preload (){	
    	this.load.image('mort', '../resources/Mort.png')

	}
	
    create (){	
		this.add.image(1200, 1000, 'mort');	
		
	}

	update (){
	}
}
