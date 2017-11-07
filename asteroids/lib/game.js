const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

const Game = function () {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({pos: this.randomPosition(), game: this});
};

Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 15;

Game.prototype.randomPosition = function(){
  let x = Game.DIM_X * Math.random();
  let y = Game.DIM_Y * Math.random();
  return [x, y];
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let options = {pos: this.randomPosition(), game: this};
    this.asteroids.push(new Asteroid(options));
  }
};

Game.prototype.draw = function (ctx){
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach( el => {
    el.draw(ctx);
  });
};

Game.prototype.moveObjects = function moveObjects(){
  // debugger;
  this.allObjects().forEach( el => {
    el.move();
  });
};

Game.prototype.wrap = function(pos){
  let x = pos[0];
  let y = pos[1];
  if (x > Game.DIM_X) {
    x -= Game.DIM_X;
  } else if (x < 0) {
    x += Game.DIM_X;
  }
  if (y > Game.DIM_Y) {
    y -= Game.DIM_Y;
  } else if (y < 0) {
    y += Game.DIM_Y;
  }
  return [x, y];
};

Game.prototype.checkCollisions = function(){
  for (var i = 0; i < this.allObjects().length; i++) {
    for (var j = 0; j < this.allObjects().length; j++) {
      if (i === j) {
        continue;
      } else {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          debugger;
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  }
};

Game.prototype.step = function(){
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (asteroid){
  let idx = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(idx, 1);
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]);
};

module.exports = Game;
