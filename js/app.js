// Enemies our player must avoid

var allEnemies = [];

var ArcadeObjects = function (x, y) {
  this.x = 0;
  this.y = 0;
  this.startingPoint = 0;
  this.endingPoint = 550;
  this.sprite;
};

var Enemy = function(x, y) {
  ArcadeObjects.call(this, Enemy);
  this.sprite = 'images/enemy-bug.png';
  this.x = (Math.floor(Math.random() * (-1500)) + 2); // give it movement | y = 0
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

Enemy.prototype.constructor = Enemy;
Enemy.prototype = Object.create(ArcadeObjects.prototype);    // inherits from ArcadeObjects

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
  this.y = 60;
  for (let i = 0; i < allEnemies.length; i++) {
    allEnemies[i].startPoint = (Math.floor(Math.random() * (-1800)) + 5);
    allEnemies[i].y = allEnemies[i].y + 80;   // y coordinate of the ladybugs
    if (allEnemies[i].y > 220) {
        allEnemies[i].y = 60;
    }
    if (allEnemies[i].x >= this.endingPoint) {
        allEnemies[i].x = allEnemies[i].startingPoint;    // keep the ladybugs inbounds
    }
  }
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

Player.prototype.constructor = Player;
Player.prototype = Object.create(ArcadeObjects); // inherits from ArcadeObjects

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
