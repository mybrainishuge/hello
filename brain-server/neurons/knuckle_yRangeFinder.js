var brain = require('brain');

var net = new brain.NeuralNetwork();

//get range of fingers tip 
net.train([
  {input:[36.32599999999999], output:{oc: 1}}, 
  {input:[-7.2379999999999995], output:{oc: 0}}
]);

module.exports = net;