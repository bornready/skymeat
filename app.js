var express = require('express')
var bodyParser = require('body-parser')
require('sugar')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

var mongouri = process.env.MONGOHQ_URL || 'mongodb://localhost/mydb'
var store = require('promised-mongo')(mongouri).collection('store');

app.post('/save', function(req, res){
	store.save({host: req.body.host, conn: req.body.conn}, function(err, saved) {
  		if( err || !saved ) console.log(req.body + " not saved");
  		else console.log(req.body + " saved");
  		res.send(req.body);
  	});
});

app.get('/list', function(req, res){
	store.find().toArray().then(function(docs) {
  		res.send(docs);
  	});
});

var server = app.listen(Number(process.env.PORT || 5000), function() {
    console.log('Listening on port %d', server.address().port);
});
