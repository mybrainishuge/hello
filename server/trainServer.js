var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname,'../client')));

var brain = require('brain');

app.get('/brain', (req, res) => {



  var checkExtendedNet = require('./neurons/checkExtended.js');
  var extendedCheckResults = checkExtendedNet.run(/*DATA*/);
  if (extendedCheckResults.true > extendedCheckResults.false) {
    //is extended
  } else {
    //is not extended
  }

  





 
  res.end();

});

app.post('/run', (req, res) => {

  res.end();  
});


app.get('/test', (r, rr) => {

  rr.end();
});

app.listen(3000, () => console.log('listening on 3000'));