var morgan 	   = require('morgan'),
	bodyParser = require('body-parser');

// read file
var fs 		 = require('fs'),
	stream   = require('stream'),
	readline = require('readline');

var LineByLineReader = require('line-by-line');
var lr = new LineByLineReader('./app/data/rawData');

var globalLocTable = [];

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
	var path = req.body.name || "./data/rawData"
	fs.readFile(path, {"encoding": "utf8"}, function(err, data) {
		if (err) { throw err };
		centroidLocation = parseData(data);
		// console.log(centroidLocation);
		res.json(centroidLocation);
		next();
	});	
};

var readLineByLine = function() {
	lr.on('error', function(err) {
		// if (err) { throw err };
		console.log(err);
		console.log("dirname", __dirname);
	});

	lr.on('line', function (line) {
		var val = JSON.parse(line).coordinates;
		if( val !== undefined ) {
			// console.log(val);
			if (val) {
				globalLocTable.push(val.coordinates);
			};
		}
	})

	lr.on('end', function() {
		console.log("All lines are read, file is closed now!");
	})
};

var readLargeFileInBatch = function(req, res, next) {
	var centroidLocation;
	var path = 'data/rawData';
	fs.readFile(path, {"encoding": "utf8"}, function(err, data) {
		if (err) { throw err };
	});	
};

// test with directly file read
module.exports = function(app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../app'));

	// Set up routing table
	// app.get("/data", function(req, res, next) {
	// 	// Functionality
	// 	// loop through
	// 	executionContent(req, res, next);
	// });
	// app.post("/data", function(req, res, next) {
	// 	executionContent(req, res, next)
	// });

	readLineByLine();

	// readLineByLine();
	app.get("/data/raw", function(req, res, next) {
		// readLineByLine(req, res, next);
		res.json(globalLocTable);
		next();
	});
	// readLargeFileInBatch();
}