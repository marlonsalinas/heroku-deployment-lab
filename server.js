require('dotenv').config();

// Dependencies //
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;

// Port //
//Allow use of Heroku's port or my own local port, depending on environment
const PORT = process.env.PORT || 3000;

// Database //

// How to connect to database either via Heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

//Connect to Mongo, fix depreciation warnings from Mongoose
//May or may not need these depending on my Mongoose version
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected:', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

// Middleware //

// Use public folder for static assets
app.use(express.static('public'));

// Populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

// Use method override
app.use(methodOverride('_method')); // allow POST, PUT, and DELETE from a form

// Routes //

// localhost:3000
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Listener //
app.listen(PORT, () => console.log('express is listening on:', PORT));