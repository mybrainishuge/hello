var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between index tip Y and middle knuckle Y -  large means index pointing down
net.train([
  {input:[85.93], output:{true: 1}}, 
  {input:[32.383], output:{false: 1}}
]);

module.exports = net;