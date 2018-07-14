var ArcadeObjects = function (x, y) {
  this.sprite;
  this.x = 0;
  this.y = 0;
};

var Enemy = function(x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// inherits from ArcadeObjects
Enemy.prototype = Object.create(ArcadeObjects.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x >= 500) {
    this.x=0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// instantantiate objects
var ladyBug1 = new Enemy(1, 60, 120);
var ladyBug2 = new Enemy(1, 140, 160);
var ladyBug3 = new Enemy(1, 220, 90)

// Enemies our player must avoid
var allEnemies = [ladyBug1, ladyBug2, ladyBug3];

/*var ladyBug1 = new Enemy();
var ladyBug2 = new Enemy();
var ladyBug3 = new Enemy();
var ladyBug4 = new Enemy();
var ladyBug5 = new Enemy();
allEnemies.push(ladyBug1);
allEnemies.push(ladyBug2);
allEnemies.push(ladyBug3);
allEnemies.push(ladyBug4);
allEnemies.push(ladyBug5);*/

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
  checkForCollision(this.x, this.y);
};

// Reset the Player
Player.prototype.reset = function() {
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
    };
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
}
