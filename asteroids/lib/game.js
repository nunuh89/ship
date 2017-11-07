const Asteroid = require('./asteroid.js');

const Game = function () {
  this.asteroids = [];
  this.addAsteroids();
};

Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 20;

Game.prototype.randomPosition = function(){
  let x = Game.DIM_X * Math.random();
  let y = Game.DIM_Y * Math.random();
  return [x, y];
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let options = {pos: this.randomPosition()};
    this.asteroids.push(new Asteroid(options));
  }
};

Game.prototype.draw = function (ctx){
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach( el => {
    el.draw(ctx);
  });
};

Game.prototype.moveObjects = function moveObjects(){
  this.asteroids.forEach( el => {
    el.move();
  });
};

module.exports = Game;
