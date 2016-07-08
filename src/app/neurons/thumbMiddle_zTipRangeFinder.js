var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between thumb tip Z and middle tip Z.  If small then D
net.train([
  {input:[-23.054], output:{true: 1}}, 
  {input:[46.468], output:{false: 1}}
]);

module.exports = net;