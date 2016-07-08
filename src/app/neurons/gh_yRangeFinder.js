let brain = require('brain');
let net = new brain.NeuralNetwork();

//takes difference between index tip x vector and middle tip x vector.  If large then G if small then H
net.train([
  {input:[19.1689], output:{g: 1}}, 
  {input:[6.3415], output:{h: 1}}
]);

module.exports = net;