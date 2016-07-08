var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check boolean that compares thumb tip to index and middle pip positions
net.train([
  {input:[true], output:{t: 1}}, 
  {input:[false], output:{mn: 0}}
]);

module.exports = net;