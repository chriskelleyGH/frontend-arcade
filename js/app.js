// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.xMove = 101; // 101 is width of each column, distance to next column
    this.yMove = 83; // 83 is height of each row, distance to next row
    this.xStart = -202; // start two xMoves off of the screen
    this.x = this.xStart;
    this.y = (this.yMove * y) - 25;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed; // Set the enemy's speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.xMove * this.speed) * dt;

    if (this.y == player.y && (Math.trunc(this.x) + this.xMove/2 > player.x && this.x < player.x + player.xMove/2)) {
        player.reset();
    }

    if (this.x > 505) { // if enemy is off the screen, reset to start position
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    this.x = this.xStart; // restet to two xMoves off of the screen
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.xMove = 101; // 101 is width of each column, distance to next column
        this.yMove = 83; // 83 is height of each row, distance to next row
        this.xStart = this.xMove * 2;
        this.yStart = (this.yMove * 5) - 25;
        this.x = this.xStart;
        this.y = this.yStart;

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    winGame() {
        const modal = document.querySelector(".modal");
        modal.classList.toggle("show-modal");
    }

    handleInput(keyInput) {
        if (keyInput == 'left') {
            if (this.x > 0) {
                this.x -= this.xMove;
            }
        } else if (keyInput == 'right') {
            if (this.x < 404) {
                this.x += this.xMove;
            }
        } else if (keyInput == 'up') {
            if (this.y > 0) {
                this.y -= this.yMove;
            }
        } else if (keyInput == 'down') {
            if (this.y < 390) {
                this.y += this.yMove;
            }
        }

        // Check to see if the other side of the road has been reached.
        if (this.y < 0) {
            this.winGame();
        }
    }

    // Move player back to start position
    reset() {
        this.x = this.xStart;
        this.y = this.yStart;
    }
}

const enemy1 = new Enemy(1, 5);
const enemy2 = new Enemy(2, 2);
const enemy3 = new Enemy(3, 3);
const enemy4 = new Enemy(4, 4);
const allEnemies = []
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

const player = new Hero();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const modal = document.querySelector(".modal");
    if (!modal.classList.contains('show-modal')) { // Check to make sure model is not open
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    }
});

// This listens for the modal button to restart the game
document.addEventListener('click', function(event) {
    const modal = document.querySelector(".modal");
    if(event.target.matches('.modal-close')) { // If the modal is closed
        modal.classList.toggle("show-modal");
        player.reset();
    }
});
