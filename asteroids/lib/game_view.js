const Game = require("./game.js");


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
