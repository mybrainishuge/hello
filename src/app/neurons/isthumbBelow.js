var brain = require('brain');

var net = new brain.NeuralNetwork();

net.train([
  {input: [-10.186500000000002], output: {true: 1}}, 
  {input: [-30.117919999999998], output: {false: 1}}
]);

module.exports = net;