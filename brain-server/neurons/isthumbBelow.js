var brain = require('brain');

var net = new brain.NeuralNetwork();

net.train([
  {input: [true], output: {e: 1}}, 
  {input: [false], output: {e: 0}}
]);

module.exports = net;