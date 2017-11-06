// const sum = function sum(){
//   let total = 0;
//   for (var i = 0; i < arguments.length; i++) {
//     total += arguments[i];
//   }
//   return total;
// };

const sum = function sum(...args){
  let total = 0;
  for (var i = 0; i < args.length; i++) {
    total += args[i];
  }
  return total;
};

// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5) === 15);
class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

Function.prototype.myBind = function myBind(){
  let context = arguments[0];
  const fn = this;
  let otherArgs = Array.prototype.slice.call(arguments, 1);

  return function _boundFn() {
    // () => {}
    let callArgs = Array.from(arguments);
    return fn.apply(context, otherArgs.concat(callArgs));
  };
};

Function.prototype.myBind2 = function myBind2(){
  let context = arguments[0];
  let otherArgs = Array.prototype.slice.call(arguments, 1);
  return (...callArgs) => this.apply(context, otherArgs.concat(callArgs));
};

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "me"
markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

function curriedSum(numArgs){
  const numbers = [];
  let total = 0;

  function _curriedSum(num){
    numbers.push(num);
    if (numbers.length === numArgs) {

      numbers.forEach( el => {
        total += el;
      });
      return total;
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

// Function.prototype.curry = function curry(numArgs) {
//   const args = [];
//   const fn = this;
//
//   function _curry(arg) {
//     args.push(arg);
//     if (args.length === numArgs) {
//       return fn.apply(undefined, args);
//     } else {
//       return _curry;
//     }
//   }
//   return _curry;
// };

Function.prototype.curry = function curry(numArgs) {
  const args = [];
  const fn = this;

  function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return fn(...args);
    } else {
      return _curry;
    }
  }
  return _curry;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}
//
// sumThree(4, 20, 6); // == 30

const sum1 = curriedSum(4);
// let x = sum1(5)(30)(20)(1); // => 56
console.log(sum1(5)(30)(20)(1));

// you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30
//
//
//
// // or more briefly:
console.log(sumThree.curry(3)(4)(20)(6));
sumThree.curry(3)(4)(20)(6); // == 30
