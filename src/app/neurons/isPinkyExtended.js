var brain = require('brain');

var net = new brain.NeuralNetwork();
//Check to see if pinky is extended
net.train([
  {input: [true], output: {true: 1}}, 
  {input: [false], output: {false: 1}}
]);

module.exports = net;