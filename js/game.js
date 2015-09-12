GameStates.Game = {
	initWorld: function() {
		//Set some constant variables
		this.playerSpeed = 270;
		this.ballSpeed = 200;
		this.blocksPerRow = 4;
		this.blockSpeed = 35;
		this.game.score = 0;
		this.spawnTime = 65;
		this.variation = 25;
		this.gameData = {};
		
		//Add a background to the game
		this.add.sprite(0, 0, 'background');
		
		//Ass score display to the game
		this.scoreDisplay = this.add.text(10, 8, "0", {
			fill: "white",
			fontSize: 8
		});
		
		//make the score appear in front of everything
		this.scoreDisplay.z = 5;
		
		// Add keyboard input.
		this.cursors = this.input.keyboard.createCursorKeys();
	},
	
	//Add the player
	addPlayer: function () {
		this.player = this.add.sprite(160, 440, 'player');
		this.physics.arcade.enable(this.player);
		this.player.anchor.setTo(0.5, 0.5);
		this.player.enableBody = true;
		this.player.body.immovable = true;
	},
	
	//Add the ball
	addBall: function (posX, posY) {
		//create the temo var for the ball
		var temp = this.add.sprite(posX, posY, 'ball');

		//set its values
		//temp = this.add.sprite(160, 420, 'ball');
		this.physics.arcade.enable(temp);
		temp.anchor.setTo(0.5, 0.5);
		temp.enableBody = true;
		temp.body.bounce.setTo(1, 1);
		temp.body.velocity.x = ((Math.random() * this.ballSpeed));
		temp.body.velocity.y = -this.ballSpeed;
		temp.body.collideWorldBounds = true;

		//add it to the game
		this.balls.add(temp);
	},

	//Add normal block in set places
	addSetBlock: function (posX, gravY, double) {
		var posY = -50;
		if(double == null){double = false;}
		
		//add the block
		if(double == true){
			var temp = this.add.sprite(posX, posY, 'block3');
			temp.type = "double";
			temp.lives = 1;
			temp.frame = 0;			
		}else{		
			var temp = this.add.sprite(posX, posY, 'block');
			temp.type="normal";
		}
		
		this.physics.arcade.enable(temp);
		temp.enableBody = true;
		temp.body.immovable = true;
		temp.body.gravity.y = gravY;
		
		this.blocks.add(temp);
	},
	
	//Add blocks selecting a random type
	addBlock: function(){
		var posX = Math.floor((Math.random() * 250));
		var posY = -50;
		var type = Math.floor(Math.random() * 10);
		
		//see if we are adding a special block
		if(type < 3){
			var temp = this.add.sprite(posX, posY, "block2");
			temp.type = "addBall";
		}else if((type == 3) && (this.game.score > 800)){
			var gravY = this.blockSpeed + (Math.random(1) * this.variation);
			this.addSetBlock(5, gravY);
			this.addSetBlock(85, gravY);
			this.addSetBlock(165, gravY);
			this.addSetBlock(245, gravY);
			return (true);
		}else if((type == 4) && (this.game.score > 1350)){
			var temp = this.add.sprite(posX, posY, "block3");
			temp.type = "double";
			temp.lives = 1;
			temp.frame = 0;
		}else if((type == 5) && (this.game.score > 2200)){			
			var gravY = this.blockSpeed + (Math.random(1) * this.variation);
			this.addSetBlock(5, gravY, true);
			this.addSetBlock(85, gravY, true);
			this.addSetBlock(165, gravY, true);
			this.addSetBlock(245, gravY, true);
			return (true);
		}else if((type == 6) && (this.game.score > 3000)){
			var temp = this.add.sprite(posX, posY, "block");
			temp.type = "hNormal";
		}else if((type == 7) && (this.game.score > 4000)){
			var temp = this.add.sprite(posX, posY, "block3");
			temp.type = "hDouble";
			temp.lives = 1;
			temp.frame = 0;
		}else{
			var temp = this.add.sprite(posX, posY, 'block');
			temp.type="normal";
		
		}
		this.physics.arcade.enable(temp);
		temp.enableBody = true;
		temp.body.immovable = true;
		temp.body.gravity.y = this.blockSpeed  + (Math.random(1) * this.variation);
		this.blocks.add(temp);
	},
	
	//add score text when a block is destrowed
	addBlockScore: function(posX, posY, score){
		//create the text (color dependant on score)
		if(score < 200){
			var temp = new Phaser.Text(this.game, posX, posY, score, {
				fill: "green",
				fontSize: 1
			});
		}else if(score < 400){
			var temp = new Phaser.Text(this.game, posX, posY, score, {
				fill: "blue",
				fontSize: 1
			});			
		}else{
			var temp = new Phaser.Text(this.game, posX, posY, score, {
				fill: "red",
				fontSize: 1
			});			
		}
		
		//add the text to the game
		this.scoreText.add(temp);
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
	
	//Check for collsion between player and the ball
	checkHitWithPlayer: function () {
		if(this.game.physics.arcade.collide(this.balls, this.player)){
			this.hit.play();	
		}
	},
	
	//Check for collsion between player and the blocks and update the horizonatl blocks
	updateBlocks: function () {		
		this.blocks.forEach(function (block) {
			
			//check collision with player
			if(block.body.y > 420 && block.body.y < 440){
				if((block.body.x+70 > this.player.body.x) && (block.body.x < this.player.body.x+70)){
					this.saveData();
					this.loose.play();
					this.state.start("Menu");
				}
			}
			
			//update the horizontal blocks
			if((block.type == "hNormal") || (block.type == "hDouble")){
				
				//give the block some x speed if it does not have any
				if(block.body.velocity.x == 0){
					if(Math.random(2) == 1){block.body.velocity.x = this.blockSpeed + (Math.random(1) * this.variation * 3);}
					else{block.body.velocity.x -= this.blockSpeed + (Math.random(1) * this.variation * 3);}
				}
				
				//check if the block needs to turn around
				if((block.body.x < 1) && (block.body.velocity.x < 0)){block.body.velocity.x *= -1;}
				if((block.body.x > 249) && (block.body.velocity.x > 0)){block.body.velocity.x *= -1;}
			}
			
		}, this);
	},

	//check collision between ball and blocks
	checkHitWithBlocks: function () {
		if(this.game.physics.arcade.collide(this.balls, this.blocks, this.ballCollidesWithBlock, null, this)){
			this.scoreDisplay.setText(this.game.score);
		}
	},
	
	//Check if the ball is below the player
	ballCollidesWithGround: function() {
		this.balls.forEach(function (ball) {
			if (ball.y >= 520) {
				ball.kill();
			}
		});
	},
	
	//Collison callback for block and ball
	ballCollidesWithBlock: function(ball, block) {
		
		scoreAdd = 0;
		
		if((block.type == "double") || (block.type == "hDouble")){
			if(block.lives == 1){
				block.lives = 0;
				block.frame = 1;
				this.hit.play();
				return;
			}else{
				scoreAdd+=75;
			}
		}
		
		//check if there is anything special about the block
		if(block.type == "addBall"){
			scoreAdd+=50;
			this.addBall(block.body.position.x+30, block.body.position.y);
			
			//play the special hit sound
			this.hit2.play();
		}else{
			//play the default hit sound
			this.hit.play();
		}
		
		//set up the score var
		scoreAdd += 100;
		
		//multiply addscore by the amount of balls in existance
		scoreAdd *= this.balls.total;
		
		//add the floating score for the block
		this.addBlockScore(block.body.position.x, block.body.position.y, scoreAdd);

		//increment the score
		this.game.score+=scoreAdd;
		
		//kill the block
		block.kill();
	},
	
	//Detect and handle touch input
	handleTouchInput: function () {
		if (this.input.pointer1.isDown) {
			this.player.body.x = this.input.pointer1.worldX - this.player.body.width/2;
		}
	},
	
	//detect and handle keyboard input
	handleKeyboardInput: function () {
		if (this.cursors.right.isDown) {
			this.player.body.velocity.x = this.playerSpeed;
		}

		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -1 * this.playerSpeed;
		}
	},

	//function to create an absolute number
	abs: function (input) {
		//make the number positive if it is not
		if(input < 0){
			input = (input * -1);
		}

		//return the abs value
		return(input);
	},

	//check if the player has run out of balls on the screen and looses
	checkBallCount: function(){
		if(this.balls.total == 0){
			console.log("out of balls... you loose");
			this.saveData();
			this.loose.play();
			this.state.start("Menu");
		}	
	},

	//makes sure the speed of the balls is acceptable
	checkBallSpeed: function() {
		this.balls.forEach(function (ball) {
			//function to create an absolute number
			abs = (function (input){
				//make the number positive if it is not
				if(input < 0){
					input = (input * -1);
				}

				//return the abs value
				return(input);				
			});

			//if overall ball movement is too slow increase the y movement speed
			if(this.abs(ball.body.velocity.x) + this.abs(ball.body.velocity.y) < 300){
				console.log("ball is too slow");
				ball.body.velocity.y = (ball.body.velocity.y*2);
			}

			//if the x speed is too slow make is a random number between -200 to 200
			if(this.abs(ball.body.velocity.x) < 100){
				console.log("ball x is too slow");
				ball.body.velocity.x = (Math.random() * 400);
				ball.body.velocity.x = ball.body.velocity.x - 200;
			}

			//if the y speed is too slow make is a random number between -80 to 80
			if(this.abs(ball.body.velocity.y) < 60){
				console.log("ball y is too slow");
				ball.body.velocity.y = (Math.random() * 240);
				ball.body.velocity.y = ball.body.velocity.y - 120;
			}

			//make sure the y speed of the ball is not too high
			if(ball.body.velocity.y > 500){
				ball.body.velocity.y = ball.body.velocity.y - 20;
			}
			else if(ball.body.velocity.y < -500){
				ball.body.velocity.y = ball.body.velocity.y + 20;
			}
		});
	},

	//update the score text
	updateScoreText: function(){
		this.scoreText.forEach(function (text) {
			//make sure that text is defined so as to not crash
			if(text != null){
				//move and resize the text
				text.position.y -= 5;
				text.fontSize += 1;

				//destrroy the text at the end of its life
				if(text.fontSize > 48){
					text.destroy();
				}
			}
		});
	},
	
	//update the save file for data
	saveData: function(){
		//save the score as highscore if its higher
		if(this.game.score > this.gameData.highscore){
			this.gameData.highscore = this.game.score;
			localStorage.setItem('blocksData', JSON.stringify(this.gameData));
			console.log(JSON.parse(localStorage.getItem('blocksData')));		
		}
	},
	
	loadData: function(){
		//try to load the file
		this.gameData = JSON.parse(localStorage.getItem('blocksData'));
		
		//check if the data has loaded
		if(this.gameData){
			console.log(JSON.parse(localStorage.getItem('blocksData')));
		}else{
			this.gameData = {};
			this.gameData.highscore = 0;
		}
	},
	
	//Create the needed game objects
	create: function() {
		//initiate objects
		this.initWorld();
		this.addPlayer();
		
		//load the data
		this.loadData();
		
		//create the group for the blocks and the ball(s)
		this.blocks = this.game.add.group();
		this.balls = this.game.add.group();
		this.scoreText = this.game.add.group();
		
		//add the initial block and ball
		this.addBlock();
		this.addBall(160, 420);
		
		//add the sounds
		this.loose = this.game.add.audio('loose');
		this.hit = this.game.add.audio('hit');
		this.hit2 = this.game.add.audio('hit2');
		this.bounce = this.game.add.audio('bounce');
	},
	
	//Update all the things
	update: function() {
		//set player velocity to 0
		this.player.body.velocity.x = 0;

		//check if new block needs to be spawned
		this.spawnBlock();
				
		//Check collisions
		this.checkHitWithBlocks();
		this.checkHitWithPlayer();
		this.updateBlocks();
		this.ballCollidesWithGround();
		
		//keep the balls moving
		this.checkBallSpeed();

		//check if the player has no balls left
		this.checkBallCount();
		
		//update the balls text
		this.updateScoreText();

		//Check Input
		this.handleTouchInput();
		this.handleKeyboardInput();
	}
};