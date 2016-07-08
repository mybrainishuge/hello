var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between thumb tip and middle finger pip if the diff is small we have an S
net.train([
  {input:[-27.971000000000004], output:{true: 1}}, 
  {input:[5.551000000000016], output:{false: 1}}
]);

module.exports = net;