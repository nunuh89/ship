const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

const COLOR = 'purple';
const RADIUS = 10;


const Asteroid = function(options) {
  options.radius = options.radius || RADIUS;
  options.vel = options.vel || Util.randomVec(Math.random());
  options.color = options.color || COLOR;
  MovingObject.call(this, options);
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
