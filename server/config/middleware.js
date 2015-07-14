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
	// All handlers 
	// check geo info
	// going through the file
	var parseData = function(inputData) {
		// console.log("I am done");
		var dataByPlace = JSON.parse(inputData).result.places;

		var bLoc = [];
		// loop through dataObj
		for (var i = dataByPlace.length - 1; i >= 0; i--) {
			bLoc[i] = dataByPlace[i].centroid;
		};

		// console.log(bLoc);
		return bLoc;
	}

	// var centroidLocation;
	fs.readFile('./data/city', {"encoding": "utf8"}, function(err, data) {
		if (err) { throw err };
		// console.log(data);
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
		// Actual functionality
		executionContent(req, res, next);
	})
	

}