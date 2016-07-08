var brain = require('brain');

var net = new brain.NeuralNetwork();

//iF index tip y is less than index pip y return true
net.train([
  {input:[25.636], output:{true: 1}}, 
  {input:[-2.724], output:{false: 1}}
]);

module.exports = net;