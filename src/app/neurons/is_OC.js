const brain = require('brain');

const net = new brain.NeuralNetwork();
//checks the tip of the middle and the index Z positions
net.train([
  {input:[-0.153022], output:{c: 1}},
  {input:[-0.474677], output:{o: 1}}

]);

module.exports = net;