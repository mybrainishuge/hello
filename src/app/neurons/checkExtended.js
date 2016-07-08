var brain = require('brain');

var net = new brain.NeuralNetwork();

//1 is true; 0 is false
net.train([
  {input: [0, 0, 0, 0, 0] , output: {false: 1}},
  {input: [1, 0, 0, 0, 0], output: {true: 1}},
  {input: [0, 1, 0, 0, 0], output: {true: 1}},
  {input: [0, 0, 1, 0, 0], output: {true: 1}},
  {input: [0, 0, 0, 1, 0], output: {true: 1}},
  {input: [0, 0, 0, 0, 1], output: {true: 1}},
]);

module.exports = net;

//if net.run(DATA) returns a larger % for extended, then run a function to check the extended branch
  //else run a function to check the non-extended branch