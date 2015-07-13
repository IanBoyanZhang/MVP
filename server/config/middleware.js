var morgan 	   = require('morgan'),
	bodyParser = require('body-parser');

var OAuth = require('oauth');
var OAuth2 = OAuth.OAuth2;

var secret = require('./config');

module.exports = function(app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../app'));
}