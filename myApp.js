const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

// Serve static files from '/public'
app.use('/public', express.static(__dirname + '/public'));

// Parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: false }));

// Send 'Hello World' to console
console.log("Hello World");

// Absolute path for index.html
const absolutePath = __dirname + '/views/index.html';

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

// Route to return a JSON response
app.get('/json', (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }
    res.json({ "message": message });
});

// Route to return current time
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ "time": req.time });
});

// Route to echo back a word
app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({ echo: word });
});

// Route to handle POST requests for /name
app.route('/name')
    .get((req, res) => {
        const firstName = req.query.first;
        const lastName = req.query.last;
        res.json({ "name": `${firstName} ${lastName}` });
    })
    .post((req, res) => {
        const firstName = req.body.first; 
        const lastName = req.body.last;   
        res.json({ "name": `${firstName} ${lastName}` });
    });

module.exports = app;
