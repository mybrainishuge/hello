var brain = require('brain');

var net = new brain.NeuralNetwork();

//Check difference between thumb tip x and ring mcp x.  If thumb tip is less than ring MCP
net.train([
  {input:[7.232], output:{true: 1}}, 
  {input:[55.7899], output:{false: 1}}
]);

module.exports = net;