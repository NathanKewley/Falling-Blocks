//Object to hold all our game states.
var GameStates = {};

document.addEventListener("DOMContentLoaded", function(){
	// Portrait game orientation.
	var width = 320;
	var height = 533;
	
	//lock the orientation... not needed, this is done in the app manifest
	//lockedAllowed = window.screen.mozLockOrientation("portrait-primary");
	
	//Set up the game canvas
	var game = new Phaser.Game(width, height, Phaser.CANVAS, "game");
	
	//Add the states to the game
	game.state.add('Preloader', GameStates.Preloader);
	game.state.add('Menu', GameStates.Menu);
	game.state.add('Game', GameStates.Game);
	game.state.add('Tut', GameStates.Tut);	

	//Start the initial state
	game.state.start('Preloader');
});