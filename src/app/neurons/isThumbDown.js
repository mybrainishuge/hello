var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between thumb tip Y and index knuckle Y -  large means thumb facing down
net.train([
  {input:[69.187], output:{true: 1}}, 
  {input:[4.69], output:{false: 1}}
]);

module.exports = net;