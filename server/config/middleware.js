var morgan 	   = require('morgan'),
	bodyParser = require('body-parser');

var OAuth = require('oauth');
var secret = require('./config');
// twitter urls
var user_stream_url   = "https://userstream.twitter.com/1.1/user.json";
var request_token_url = "https://api.twitter.com/oauth/request_token";
var access_token_url  = 'https://api.twitter.com/oauth/access_token';

// oauth V1.0?
var OAuth = OAuth.OAuth;
var oauth = new OAuth(
	request_token_url,
	access_token_url,
	secret.twitterConsumerKey,
	secret.twitterConsumerSecret,
	'1.0',
	null,
	'HMAC-SHA1',
	null
	);

// console.log(oauth);




module.exports = function(app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../app'));
}