var config = {};
config.db = {};
//config.webhost = 'http://localhost:8080/';
config.webhost = process.env.MONGOLAB_URI;

config.db.host = 'localhost';
config.db.name = 'url_shortener';

module.exports = config;