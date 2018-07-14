// Enemies our player must avoid

var speed = 15,
var allEnemies = [];

var ArcadeObjects = function (x, y) {
  this.sprite;
  this.startPoint = 0;
  this.endPoint = 550;
  this.x = 0;
  this.y = 0;
};

var Enemy = function(x, y) {
  ArcadeObjects.call(this, Enemy);
  this.sprite = 'images/enemy-bug.png';
  this.multiplier = Math.floor((Math.random() * 5) + 1); // give it movement | y = 0
};

Enemy.prototype = Object.create(ArcadeObjects.prototype);    // inherits from ArcadeObjects
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
  this.y = 60;
  for (let i = 0; i < allEnemies.length; i++) {
    allEnemies[i].startPoint = (Math.floor(Math.random() * (-2000)) + 2);

    allEnemies[i].y = allEnemies[i].y + 80;   // y-coordinate of the enemy

    if (allEnemies[i].y > 220) {
        allEnemies[i].y = 60;
    } if (allEnemies[i].x >= this.endPoint) {
      allEnemies[i].x = allEnemies[i].startPoint;
    }
  }
};

Enemy.prototype.reset = function() {
	this.x = -200;
	var speed = [240, 150, 40];
	this.y = speed[Math.floor((Math.random() * 3))];
};

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

Player.prototype = Object.create(ArcadeObjects); // inherits from ArcadeObjects
Player.prototype.constructor = Player;

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {    // Change the player's position based on the user keyboard input
	if (direction == 'up') {
		this.y = this.y - 80;
	} else if (direction == 'down') {
		this.y = this.y + 80;
	} else if (direction == 'left') {
		this.x = this.x - 101;
	} else if (direction == 'right') {
		this.x = this.x + 101;
	} if (this.x < 0) {
		this.x = 0;
	} else if (this.x > 606) {
		this.x = 606;
  } else if (this.y > 404) {
    this.reset();   // reset player to starting position if he moves down outside the canvas
  }
};

Player.prototype.reset = function() {   // Reset the Player
  this.sprite = 'images/char-boy.png';
	this.x = 200;
	this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

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
