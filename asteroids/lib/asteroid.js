const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");
const Ship = require("./ship.js");

const COLOR = 'purple';
const RADIUS = 10;


const Asteroid = function(options) {
  options.radius = options.radius || RADIUS;
  options.vel = options.vel || Util.randomVec(Math.random());
  options.color = options.color || COLOR;
  MovingObject.call(this, options);
};

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function collideWith(otherObject) {
  // this.game.remove(this);
  // otherObject.game.remove(otherObject);
  debugger;
  if (otherObject instanceof Ship) {

    otherObject.relocate();
  }
};

module.exports = Asteroid;
