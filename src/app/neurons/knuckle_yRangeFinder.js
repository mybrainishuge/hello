var brain = require('brain');

var net = new brain.NeuralNetwork();

//get range of fingers tip 
net.train([
  {input:[36.32599999999999], output:{c: 1}}, 
  {input:[-7.2379999999999995], output:{o: 1}}
]);

module.exports = net;