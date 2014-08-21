var express = require('express')
var bodyParser = require('body-parser')
require('sugar')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

var mongouri = process.env.MONGOHQ_URL || 'mongodb://localhost/mydb'
var store = require('promised-mongo')(mongouri).collection('store');

app.post('/save', function(req, res){
	store.update({host: req.body.host},{host: req.body.host, conn: req.body.conn}, {upsert: true}, function(err, saved) {
  		if( err || !saved ) console.log(req.body + " not saved");
  		else console.log(req.body + " saved");
  		res.send(req.body);
  	});
});

app.get('/get/:host', function(req, res){
  store.findOne({host: req.params.host}).then(function(doc) {
      res.send(doc.conn);
  });
});

app.get("/list", function(req, res) {
  res.sendfile('list.html')
});

app.get('/list.json', function(req, res){
	store.find().toArray().then(function(docs) {
  		res.send(docs);
  	});
});

var server = app.listen(Number(process.env.PORT || 5000), function() {
    console.log('Listening on port %d', server.address().port);
});
