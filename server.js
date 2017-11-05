const express = require('express');
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const db = require('./config/db');

//set port
const port = 8000;

//Init app
const app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//View engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//methodOverride
app.use(methodOverride('_method'));

MongoClient.connect(db.url, (err, data) => {
	if (err) return console.log(err)
	require('./app/routes')(app, data);
	app.listen(process.env.PORT || port, () => {
		console.log('We re live now, done building: ' + port);
	});
})
