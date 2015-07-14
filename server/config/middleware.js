var morgan 	   = require('morgan'),
	bodyParser = require('body-parser');

// twitter urls
// Import python read methods


module.exports = function(app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../app'));
}