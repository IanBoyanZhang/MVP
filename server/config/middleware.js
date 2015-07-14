var morgan 	   = require('morgan'),
	bodyParser = require('body-parser');

// read file
var fs 		 = require('fs'),
	stream   = require('stream'),
	readline = require('readline');
	// es  	= require('event-stream')

// var instream = fs.createReadStream('../../data/output', {flags: 'r', encoding: 'utf-8'});
// var rl       = readline.createInterface({
	// input: instream
// })

var executionContent = function	(req, res, next) {
	var parseData = function(inputData) {
		var dataByPlace = JSON.parse(inputData).result.places;

		var bLoc = [];
		for (var i = dataByPlace.length - 1; i >= 0; i--) {
			bLoc[i] = dataByPlace[i].centroid;
		};

		return bLoc;
	}

	var centroidLocation;
	// loop through request body to parse all requested string
	console.log("Server received request: ", req.body);
	var path = req.body.name || "./data/sf"
	fs.readFile(path, {"encoding": "utf8"}, function(err, data) {
		if (err) { throw err };
		centroidLocation = parseData(data);
		console.log(centroidLocation);
		res.json(centroidLocation);
		next();
	});	
}


module.exports = function(app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../app'));

	// Set up routing table
	app.get("/data", function(req, res, next) {
		// Functionality
		// loop through
		executionContent(req, res, next);
	});
	
	app.post("/data", function(req, res, next) {
		executionContent(req, res, next)
	});
}