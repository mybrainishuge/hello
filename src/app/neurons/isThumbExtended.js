var brain = require('brain');

var net = new brain.NeuralNetwork();
//Check to see if thumb is extended
net.train([
  {input: [25.0124], output: {true: 1}}, 
  {input: [-7.1345], output: {false: 1}}
]);

module.exports = net;