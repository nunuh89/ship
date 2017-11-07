/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(event) {
  const canvasEl = document.getElementById('game-canvas');
  const ctx = canvasEl.getContext('2d');

  const gameView = new GameView(ctx);
  gameView.start();

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);


window.Game = Game;

const GameView = function (ctx){
  this.game = new Game();
  this.ctx = ctx;

};


GameView.prototype.start = function start(){
  let g = this.game;
  let c = this.ctx;
  setInterval(function(){
    g.step();
    g.draw(c);
  }, 0);
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(3);
const Ship = __webpack_require__(6);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(4);
const Util = __webpack_require__(5);
const Ship = __webpack_require__(6);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass) {
    function Surrogate() {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  dist (pos1, pos2) {
    let x1 = pos1[0];
    let y1 = pos1[1];
    let x2 = pos2[0];
    let y2 = pos2[1];
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
};


module.exports = Util;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(4);
const Util = __webpack_require__(5);

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


/***/ })
/******/ ]);