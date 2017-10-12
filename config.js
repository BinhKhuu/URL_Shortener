var config = {};
config.db = {};
//config.webhost = 'http://localhost:8080/';
config.webhost = process.env.MONGOLAB_URI;

config.db.host = 'ds117615.mlab.com:17615';
config.db.name = 'url_shortener';

module.exports = config;