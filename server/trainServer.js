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
    //is not extended then send to neuron that will parse 
    //and transfer data to [a, e, m, n, o, s, t, c] paths

    var OC_checkNet = require('./neurons/knuckle_yRangerFinder.js');
    var isOC = OC_checkNet.run(/*DATA*/).oc;
    if (isOC) {
      //neuron to differentiate O & C
    } else {
      //neuron to differentiate E & A/S/M/N/T
      var e_checkNet.

    }

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