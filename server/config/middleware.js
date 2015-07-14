var morgan 	   = require('morgan'),
	bodyParser = require('body-parser');

// read file
var fs 		 = require('fs'),
	stream   = require('stream'),
	readline = require('readline');

var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('data/rawData');
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
		// console.log(centroidLocation);
		res.json(centroidLocation);
		next();
	});	
};

var readLineByLine = function() {
	// console.log(lr);
	lr.on('error', function(err) {
		if (err) { throw err };
	});

	lr.on('line', function (line) {
		// pause emitting of lines 
		// lr.pause();
		// console.log(line);
		// lr.resume();

	})

	lr.on('end', function() {
		console.log("All lines are read, file is closed now!");
	})
};

var readLargeFileInBatch = function() {
	var centroidLocation;
	var path = 'data/rawData';
	fs.readFile(path, {"encoding": "utf8"}, function(err, data) {
		if (err) { throw err };
		// centroidLocation = parseData(data);
		// console.log(centroidLocation);
		console.log('Read large file!');
	});	
};

// test with directly file read
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

	// readLineByLine();
	readLargeFileInBatch();
}