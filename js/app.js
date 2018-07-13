// Enemies our player must avoid

var allEnemies = [];

var ArcadeObjects = function (x, y) {
  this.sprite;
  this.x = 0;
  this.y = 0;
  this.startingPoint = 0;
  this.endingPoint = 550;
};

var Enemy = function(x, y) {
  ArcadeObjects.call(this, Enemy);
  this.sprite = 'images/enemy-bug.png';
  this.multiplier = Math.floor((Math.random() * 5) + 1); // give it movement | y = 0
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

Enemy.prototype = Object.create(ArcadeObjects.prototype);    // inherits from ArcadeObjects
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
  this.x = this.x + 101 * dt * this.multiplier;
  if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {  // collision check
	player.reset();    // Reset the player to her original position
	} if (this.x > 750) {
  	this.reset();    // Reset enemy after leaving the board
  }
};


Enemy.prototype.reset = function() {
	this.x = -200;
	var speed = [220, 140, 60];
	this.y = speed[Math.floor((Math.random() * 3))];
	this.multiplier = Math.floor((Math.random() * 5) + 1);
};

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var ladyBug1 = new Enemy();
var ladyBug2 = new Enemy();
var ladyBug3 = new Enemy();
var ladyBug4 = new Enemy();
var ladyBug5 = new Enemy();
allEnemies.push(ladyBug1);
allEnemies.push(ladyBug2);
allEnemies.push(ladyBug3);
allEnemies.push(ladyBug4);
allEnemies.push(ladyBug5);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
  ArcadeObjects.call(this, Player);
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 380;
};

Player.prototype.reset = function() {   // Reset the Player
  this.sprite = 'images/char-boy.png';
	this.x = 200;
	this.y = 380;
}

Player.prototype = Object.create(ArcadeObjects); // inherits from ArcadeObjects
Player.prototype.constructor = Player;

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {    // Change the player's position based on the user keyboard input
	if (dir == 'up') {
		this.y = this.y - 80;
	} else if (dir == 'down') {
		this.y = this.y + 80;
	} else if (dir == 'left') {
		this.x = this.x - 101;
	} else if (dir == 'right') {
		this.x = this.x + 101;
	} if (this.x < 0) {
		this.x = 0;
	} else if (this.x > 606) {
		this.x = 606;
  } else if (this.y > 404) {
    this.reset();
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
