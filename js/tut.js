GameStates.Tut = {
  
  create: function(){
    //create menu screen sprites
    this.add.sprite(0, 0, 'background');
    this.add.sprite(0, 0, 'tut');
		
    //Add keyboard input for testing
	  this.cursors = this.input.keyboard.createCursorKeys();
  },
  
  update: function(){
    //check for touch input
    if(this.input.pointer1.isDown){
      this.state.start('Game');
    }
    
    //check for keyboard input
    if (this.cursors.up.isDown) {
      this.state.start('Game');
    }
  }
};