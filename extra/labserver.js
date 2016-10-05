/*
 * A simple server that can be used with exercises 
 * in front end training.
 *
 * Includes:
 *  - Services static files from the 'files/' directory
 *  - Simple demo REST API
 *  - Uses cors module so can also be used from other domains
 * 
 * Requires:
 *  - Node, of course
 *  - Modules: express, body-parser, and cors
 *         npm install express body-parser cors
 * 
 * Using:
 *  - Start the server: node labserver.js
 *  - Stop the server: Ctrl-C
 *  - Uses the port 3000, can modify at the end where server is started
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var parser = bodyParser.urlencoded({ extended: true });

// Set default CORS values to headers, including
// Access-Control-Allow-Origin: *
app.use(cors());

// Router for REST services
var router = express.Router();

// General functionality for all REST services
// Dummy print to the console only
router.use(function (req, res, next) {
    console.log('I was called.');
    next();  // Must be here, we do want to continue to the actual service
});

// testing-route, GET http://localhost:3000/api/
// could also redirect..
router.get('/', function (req, res) {
    res.json({ message: 'Yey, you found me..' });
});


// List of people
// GET http://localhost:3000/api/personnel
router.route('/personnel')
	.get(function (req, res) {
	    res.json(people);
	});

// Single person, get details or delete with id
// GET http://localhost:3000/api/personnel/2
// DELETE http://localhost:3000/api/personnel/2
router.route('/personnel/:id')
	.get(function (req, res) {
	    for (var person of people) {
	        if (person.id == req.params.id) {
	            res.json(person);
	            return;
	        }
	    }
	    res.json("{'msg': 'Error, no such person!'}");
	})
	.delete(function (req, res) {
	    for (var person in people) {
	        if (people[person].id == req.params.id) {
	            people.splice(person, 1);
	            res.json("{msg: 'Person removed'}");
	            return;
	        }
	    }
	    res.json("{'msg': 'Error, no such person!'}");
	});

// data, demo stuff, should come from e.g. data base
var people = [{ id: 0, name: 'Anna Malli', email: 'anna@malli.fi' },
                { id: 2, name: 'Teemu Tehokas', email: 'teemu@tehokas.fi' },
                { id: 5, name: 'Anne Avuton', email: 'clueless@koti.org' },
                { id: 3, name: 'Taavi Tehokas', email: 'taavi@tehokas.fi' },
                { id: 6, name: 'Teemu Tumpelo', email: 'teemu@tehoton.fi' },
				{ id: 1, name: 'Annukka Malli', email: 'annukka@malli.fi' }];

// Simple tester for forms, displays the form data in a table
// <form action="http://localhost:3000/formhandler" method="post">
app.post('/formhandler', parser, function (req, res) {
   var respdata = "<html><body><h1>Data received</h1>";
   respdata += "<table border=1><tr><th>Field name</th><th>Value</th></tr>";
   for (var fname in req.body) {
	   respdata += "<tr><td>"+fname+"</td><td>"+req.body[fname]+"</td></tr>"; 
   }
   respdata += "</table>";
   respdata += "</body></html>";
   res.end(respdata);
});

// Define the REST service address with the router
app.use('/api', router);
// Where to service the static files from
app.use(express.static('files'));

// Start the server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Now listening at http://%s:%s", host, port);
});
