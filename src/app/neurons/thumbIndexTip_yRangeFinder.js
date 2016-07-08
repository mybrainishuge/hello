var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between thumb tip y and index tip y.  If thumb tip is less than index y  = F  
net.train([
  {input:[-6.4016], output:{true: 1}}, 
  {input:[66.3], output:{false: 1}}
]);

module.exports = net;