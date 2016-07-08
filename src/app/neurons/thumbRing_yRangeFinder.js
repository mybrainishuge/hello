var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check the y distance between the thumb tip and ring tip.  larger distance means V smaller means K
net.train([
  {input:[6.369], output:{true: 1}}, 
  {input:[60.009], output:{false: 1}}
]);

module.exports = net;