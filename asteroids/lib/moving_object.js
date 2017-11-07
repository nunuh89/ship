const Util = require('./utils.js');

const MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function move() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  if (Util.dist(this.pos, otherObject.pos) < (this.radius + otherObject.radius)) {
    return true;
  }
  return false;
};

MovingObject.prototype.collideWith = function collideWith(otherObject) {
  // this.game.remove(this);
  // otherObject.game.remove(otherObject);
};

module.exports = MovingObject;
