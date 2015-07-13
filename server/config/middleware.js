var morgan 	   = require('morgan'),
	bodyParser = require('body-parser');

var OAuth = require('oauth');
var OAuth2 = OAuth.OAuth2;
var secret = require('./config');
var oauth2 = new OAuth2(
	secret.twitterConsumerKey,
	secret.twitterConsumerSecret,
	'https://api.twitter.com/',
	null,
	'oauth2/token',
	null
	);

// console.log("oauth2", oauth2);
oauth2.getOAuthAccessToken(
	"",
	{'grant_type': 'client_credentials'},
	function (e, access_token, refresh_token, results) {
		// console.log('bearer: ',access_token);
		// console.log("access_token: ", access_token);
		oauth2.get('https://api.twitter.com/1.1/trends/place.json?id=3278872357',
			access_token, function(e, data, res) {
				if (e) { console.error(e); return null};
				if (res.statusCode !== 200) {
					// return console.error(res.statusCode);
					return new Error('OAuth2 request failed: ' + res.statusCode);
				};
				try {
					data = JSON.parse(data);
				}
				catch (e) {
					return console.error(e);
				}

				// return the data;
				console.log("Got data! ", data);
			})
	})


module.exports = function(app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../app'));
}