var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between thumb tip x and ring mcp x.  If thumb tip is less than ring MCP
net.train([
  {input:[-13.009032], output:{true: 1}}, 
  {input:[1.00222333], output:{false: 1}}
]);

module.exports = net;