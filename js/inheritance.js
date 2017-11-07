Function.prototype.inherits = function (parent) {
  function Surrogate() {}
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.inherits = function (parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};

function MovingObject () {}
MovingObject.prototype.move = function() {};


function Ship () {}
Ship.inherits(MovingObject);
Ship.prototype.fly = function() {};

function Asteroid () {}
Asteroid.inherits(MovingObject);
