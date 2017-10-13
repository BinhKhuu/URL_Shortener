var express = require('express');
var url = require('./models/urls.js');
var base58 = require('./lib/base58.js');
var config = require('./config.js');
var openurl = require('openurl');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var path = require('path');
var app = express();
var port = Number(process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db.url, (err,db)=>{
	if(err) console.log(err);
	console.log('MongoDB connected on '+ config.db.url);
});

//shorten url route
app.get('/short/:link(https?:\/\/www\.[a-zA-Z0-9]+.[a-z]{2,6}([a-zA-Z0-9@:%_\+.~#?&//=])*)', (req,res)=>{
	var longUrl = req.params.link;
	var shortUrl;
	url.findOne({long_url: longUrl}, (err, doc)=>{
		if(doc) {
			console.log('found entry');
			shortUrl = config.webhost + base58.encode(doc._id);
			res.send({'shortUrl': shortUrl});
		} else {
			var newUrl = url(
				{long_url: longUrl}
			);
			
			newUrl.save((err)=>{
				if(err) console.log(err);
				shortUrl = config.webhost + base58.encode(newUrl._id);
        res.send({'shortUrl': shortUrl});
			});
		}
	});
});

//encoded route
app.get('/:id([a-zA-Z0-9]*)', (req,res)=>{
	var en = req.params.id;
	var id = base58.decode(en);
	url.findOne({_id: id}, (err,doc)=>{
		if(err) console.log(err);
		if(doc) {
			res.redirect(doc.long_url);
		} else {
			res.sendFile(path.join(__dirname + '/public/index.html'));
		}
	});
});

app.listen(port,()=>{
	console.log('listening on port: ' + port.toString());
})

//todo 
//make index.html
//add redirects for incorrect urls