GameStates.Menu = {
	//Add block
	addBlock: function () {
		var posX = Math.floor((Math.random() * 250));
		var posY = -50;
		
		var temp = this.add.sprite(posX, posY, 'block');
		temp.type="normal";
		this.physics.arcade.enable(temp);
		temp.enableBody = true;
		temp.body.immovable = true;
		temp.body.gravity.y = this.blockSpeed  + (Math.random(1) * this.variation);
    temp.alpha = 0.8;
		this.blocks.add(temp);
	},  
  
	//checks if a new block needs to be spawned
	spawnBlock: function(){
		if(this.spawnTime < 0){
			this.addBlock();
			this.spawnTime = 65 + (Math.random() * this.variation);
		}else{
			this.spawnTime--;
		}
	},  
  
	loadData: function(){
		//try to load the file
		this.gameData = JSON.parse(localStorage.getItem('blocksData'));
		
		//check if the data has loaded
		if(this.gameData){
			console.log(JSON.parse(localStorage.getItem('blocksData')));
		}
		
	},  
  
  create: function(){	
		//create the data variable
		this.gameData = {};
		
    //load the game data
    this.loadData();
    
    //create menu screen sprites
    this.add.sprite(0, 0, 'background');
    this.add.sprite(0, 0, 'menu');
		
		//If there is a highscore saved
		if(this.gameData != null){
			//tell the player if they set the new highscore
			if(this.gameData.highscore == this.game.score){
				this.newHighDisplay = this.add.text(58, 212, "New Highscore!", {
					fill: "orange",
					fontSize: 10
				});
			}
				
			//draw the highscore
			this.highDisplay = this.add.text(90, 250, "Highscore", {
				fill: "white",
				fontSize: 10
			});
			this.highDisplay = this.add.text(120, 280, this.gameData.highscore, {
				fill: "white",
				fontSize: 8
			});
		}

    //tell the player thier score if they have played the game
    if(this.game.score != null){
      this.scoreDisplay = this.add.text(120, 330, "Score", {
        fill: "white",
        fontSize: 10
      });
      this.scoreDisplay = this.add.text(120, 360, this.game.score, {
        fill: "white",
        fontSize: 8
      });			
    }
		
    //Add keyboard input for testing
	  this.cursors = this.input.keyboard.createCursorKeys();
    
    //add some globals for the interactive menu
    this.blockSpeed = 35;
		this.spawnTime = 65;
		this.variation = 25;

    //create the blocks group
    this.blocks = this.game.add.group();
    
    //create an initial block
    this.addBlock();
  },
  
  update: function(){
    //check for touch input
    if(this.input.pointer1.isDown){
      this.state.start('Tut');
    }
    
    //check for keyboard input
    if (this.cursors.up.isDown) {
      this.state.start('Tut');
    }
    
    //start spawning blocks
		this.spawnBlock();
  }
};