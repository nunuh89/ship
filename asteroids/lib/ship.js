const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

const COLOR = 'yellow';
const RADIUS = 10;

const Ship = function (options) {
  options.radius = options.radius || RADIUS;
  options.vel = [0, 0];
  options.color = options.color || COLOR;
  MovingObject.call(this, options);
};

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

module.exports = Ship;
