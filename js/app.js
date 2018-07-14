// Enemies our player must avoid

var allEnemies = [];

var ArcadeObjects = function (x, y) {
  this.sprite;
  this.startingPoint = 0;
  this.endingPoint = 550;
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
    allEnemies[i].startingPoint = (Math.floor(Math.random() * (-2000)) + 2);
    allEnemies[i].x += (50 * dt);
    allEnemies[i].y = allEnemies[i].y + 80;   // y-coordinate of the enemy
    if (allEnemies[i].y > 220) {
        allEnemies[i].y = 60;
    } if (allEnemies[i].x >= this.endingPoint) {
      allEnemies[i].x = allEnemies[i].startingPoint;
    }
  }
};

Enemy.prototype.render = function() {   // Draw the enemy on the screen, required method for game
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
  checkForCollision(this.x, this.y);
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

var player = new Player();

function playerBoundries(xA, yA) {
    var boundries = {
        xStart: xA,
        xStop: xA + 98,
        yStart: yA - 20,
        yStop: yA + 50,
    }
    return boundries;
}

function checkForCollision(x, y) {
  var position = playerBoundries(x, y);
  let padding = 35;
  allEnemies.forEach(bug => {
    if ((bug.x + padding >= position.xStart - padding && bug.x + padding <= position.xStop - padding) && (bug.y >= position.yStart && bug.y <= position.yStop)) {
      player.reset();  // reset position after collision
    }
  });
  return position.end;
}

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
