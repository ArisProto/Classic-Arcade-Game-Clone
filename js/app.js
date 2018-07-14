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
  // give it movement | y = 0
  this.multiplier = Math.floor((Math.random() * 5) + 1);
};

// inherits from ArcadeObjects
Enemy.prototype = Object.create(ArcadeObjects.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
  this.y = 60;
  for (let i = 0; i < allEnemies.length; i++) {
    allEnemies[i].startingPoint = (Math.floor(Math.random() * (-2000)) + 2);
    allEnemies[i].x += (50 * dt);
    // y-coordinate of the enemy
    allEnemies[i].y = allEnemies[i].y + 80;
    if (allEnemies[i].y > 220) {
        allEnemies[i].y = 60;
    } if (allEnemies[i].x >= this.endingPoint) {
      allEnemies[i].x = allEnemies[i].startingPoint;
    }
  }
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

var Player = function () {
  ArcadeObjects.call(this, Player);
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 380;
};

// inherits from ArcadeObjects
Player.prototype = Object.create(ArcadeObjects);
Player.prototype.constructor = Player;

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  checkForCollision(this.x, this.y);
};

// necessary for the win-window
let container = document.querySelector('.container');

// Change the player's position based on the user keyboard input
Player.prototype.handleInput = function(direction) {
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
	} else if (this.x > 404) {
		this.x = 404;
  } else if (this.y > 404) {
    // reset player to starting position if he moves down outside the canvas
    this.reset();
  } else if (this.y == -20) {
    winGame();
  }
};

// Reset the Player
Player.prototype.reset = function() {
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
      // reset position after collision
      player.reset();
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

//winGame

function winGame() {
  // create html
  const divHtml = document.createElement('div');
  const h1Html = document.createElement('h1');

  // give it a class
  divHtml.setAttribute('class', 'finished');
  const inside = document.createElement('div');
  inside.setAttribute('class', 'finished-inner');
  divHtml.appendChild(inside);

  // insert it into the html
  container.insertAdjacentElement('afterbegin', divHtml);
  inside.appendChild(h1Html);

  // add text
  h1Html.innerText =
  `Congratulations!
  You Successfully Finished the Game!`;

  // add play again button
  const playAgain = document.createElement('a');
  const playAgainText = document.createTextNode("Play again");
  playAgain.appendChild(playAgainText);
  playAgain.title = "Play again";
  playAgain.href = "index.html";
  inside.appendChild(playAgain);
};
