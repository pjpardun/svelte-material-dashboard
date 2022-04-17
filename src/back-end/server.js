// Library imports
var express = require('express'), // import web server Express from node_modules
    app = express(), // Create new instance of webserver called "app"
    path = require('path'),
    port = process.env.PORT || 3030, // Define the port number from environment variable PORT or (if that doesn't exist) default to 3000
    bodyParser = require('body-parser'); // Import body-parser from node_modules to interpret HTTP requests easily.
    
    
// Decode incoming HTTP messages so we can easily understand them
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'build')))

// Register the service routes
var routes = require('./routes');
routes(app);

// Start the web server on the port
app.listen(port);

// Print a message to the console
console.log('RESTful API server started on: ' + port);
