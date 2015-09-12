//Preloader game state
GameStates.Preloader = {
	//load our assets
	preload: function() {
		//load images
		this.load.image('background', 'assets/background.jpg');
		this.load.image('player', 'assets/player.png');
		this.load.image('ball', 'assets/ball.png');
		this.load.image('block', 'assets/block.png');
		this.load.image('block2', 'assets/block2.png');
		this.load.spritesheet('block3', 'assets/block3.png', 70, 20);
		this.load.image('menu', 'assets/menu.png');
		this.load.image('tut', 'assets/tut.png');
		
		//load sounds 
		this.load.audio('loose', 'assets/loose.wav');
		this.load.audio('hit', 'assets/hit.wav');
		this.load.audio('hit2', 'assets/hit2.wav');
	},

	//start the "Game"" state
	create: function(){
 		//scale the game
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
		
		this.state.start('Menu');
	}

};