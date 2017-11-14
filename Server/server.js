const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const port = 3000;
const morgan = require('morgan');
const mongoose = require('mongoose');
const environmentRouter = require('./environments');

mongoose.connect('mongodb://agonzalez:environment123@ds259245.mlab.com:59245/environment');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('environments', environmentRouter)

app.listen(port, () => {
  console.log('Listening on http://localhost', port);
});
