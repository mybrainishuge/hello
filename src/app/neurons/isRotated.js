var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check roatation of hand by comparing index mcp y with pinky mcp y 
net.train([
  {input:[-30.666], output:{true: 1}}, 
  {input:[-10.115], output:{false: 1}}
]);

module.exports = net;