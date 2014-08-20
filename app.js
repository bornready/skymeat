var express = require('express')
var bodyParser = require('body-parser')
require('sugar')

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

var store = require('promised-mongo')('mongodb://localhost/mydb').collection('store');

app.post('/save', function(req, res){
	store.save({host: req.body.host, conn: req.body.conn}, function(err, saved) {
  		if( err || !saved ) console.log(req.body + " not saved");
  		else console.log(req.body + " saved");
  		res.send(req.body);
  	});
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
