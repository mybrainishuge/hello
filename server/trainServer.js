var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyparser.json());
app.use(express.static(path.resolve(__dirname,'../client')));

var ml = require('machine_learning');

var data = [], dt;

// app.get('/', (req, res) => {
//   res.render("index");
// });

app.post('/run', (req, res) => {
  /*
  TODO: refactor code below to capture input data and write it to database
  save it as an object with property {letter name} and value equal to the dataset

  we will need to repeat and rinse this process for the letters that we want to store and train
  
  */


data.push(req.body.data);

var result = [];
for (var i = 0; i < data.length; i++) {
  result.push('a');
}
 
 
dt = new ml.DecisionTree({
    data : data,
    result : result
});
 
dt.build();

res.end();
 
});


app.get('/test', (r, rr) => {
  var testData = [[-0.25009, 0.135744, -0.95866],
[0.178512, -0.933148, 0.31204],
[-0.0210506, -0.910785, 0.412344],
[-0.227358, -0.895927, 0.381605],
[-0.419441, -0.844405, 0.333241]];
 
console.log("Classify : ", dt.classify(testData));
 
// dt.prune(1.0); // 1.0 : mingain.
// dt.print();

rr.end();

});

app.listen(3000, () => console.log('listening on 3000'));