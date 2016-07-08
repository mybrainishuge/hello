var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between index tip y and middle tip y.  If differnce is greater we have an R
net.train([
  {input:[10.469], output:{true: 1}}, 
  {input:[0.925], output:{false: 1}}
]);

module.exports = net;