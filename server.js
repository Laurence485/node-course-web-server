const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname  + '/views/partials');

app.set('view engine', 'hbs');

console.log(__dirname + '/views/partials');


app.use((req, res, next) => { //next - what to do after function is done
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	//log some server info...date, response type and url
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log.');
		}
	});

	next();
});

//render a maintenance response...stop everything afterwards from executing (no next())
// app.use((req, res, next) => {
// res.render('maintenance.hbs');
// });

//serve static files e.g. images, CSS, JS, HTML
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})
//set up a handler for a http get request
app.get('/', (req, res) => { //request (headers, body info, path etc), response (type of data sent back)
	//res.send('<h1>hello express!</h1>');
	res.render('home.hbs',{
		pageTitle:'Home Page',
		welcomePage: 'Welcome to the home page of my website, feel free to look around.'
	});

});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle:'About Page',
	});
});

app.get('/bad', (req, res) => {

	res.send({
		Error:'Oops something went wrong',
		Error_Type: '404'
	});

});

app.listen(3000, () => {
console.log('server is up on port 3000');
});