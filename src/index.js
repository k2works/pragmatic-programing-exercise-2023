var greeting = require('./sample_es5');
console.log(greeting('ES5'));

var greet = require('./sample_es6');
var g = new greet.default('ES6');
g.say();
