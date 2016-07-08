var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check the X distance between the index tip and the thumb.  if the gap is large we have an s
net.train([
  {input:[0.2303], output:{true: 1}}, 
  {input:[63.4908], output:{false: 1}}
]);

module.exports = net;